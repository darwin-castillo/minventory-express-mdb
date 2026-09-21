# Migración: MongoDB → PostgreSQL

## Estado Actual

```
Controllers → Use Cases → IProductRepository (port)
                                ├── MongooseProductRepository  ← primario
                                └── PostgresProductRepository  ← ya existe (Dual si DATABASE_URL está set)
```

Los puertos (interfaces en `src/domain/ports/repositories/`) ya son agnósticos a la base de datos.
Solo se trata de cambiar qué adapter se inyecta en el contenedor de dependencias.

---

## Fase 1 — Hacer PostgreSQL el primario

### Cambiar en `src/framework/di/container.js`

```js
// ANTES (usa Dual → escribe en ambas, lee de PG si DATABASE_URL está set):
productRepository = new DualProductRepository(mongoProductRepo, pgProductRepo);
storeRepository    = new DualStoreRepository(mongoStoreRepo, pgStoreRepo);
userRepository     = new DualUserRepository(mongoUserRepo, pgUserRepo);

// DESPUÉS (usa solo PostgreSQL):
productRepository = new PostgresProductRepository();
storeRepository   = new PostgresStoreRepository();
userRepository    = new PostgresUserRepository();
```

- Las lecturas se servirán desde PostgreSQL.
- Las escrituras irán solo a PostgreSQL.
- MongoDB deja de usarse en el flujo nuevo.

### Actualizar smartSearchUseCase

El smartSearch usa `MongooseProductRepository.smartSearch()` ($vectorSearch de Atlas).
Apunta la dependencia al repo correcto:

```js
const smartSearchUseCase = new SmartSearchProductsUseCase(
  productRepository,  // ahora PostgresProductRepository
  aiService,
);
```

---

## Fase 2 — Migrar smartSearch ($vectorSearch) a PostgreSQL

MongoDB Atlas usa `$vectorSearch` con índice `vector_index`. En PostgreSQL se necesita:

### 2.1 Instalar extensión pgvector

```sql
CREATE EXTENSION vector;
```

### 2.2 Modificar la tabla products

```sql
ALTER TABLE products ADD COLUMN embeddings vector(768);
CREATE INDEX idx_products_embeddings ON products USING ivfflat (embeddings vector_cosine_ops);
```

### 2.3 Actualizar PostgresProductRepository.smartSearch()

En `src/infrastructure/repositories/PostgresProductRepository.js`, reemplazar:

```js
async smartSearch(queryVector) {
  const rows = await ProductModel.findAll({ limit: 10, order: [['createdAt', 'DESC']] });
  return toEntityList(rows);
}
```

Con una query usando pgvector:

```js
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../sequelize/connection');

async smartSearch(queryVector) {
  const vectorStr = `[${queryVector.join(',')}]`;
  const rows = await sequelize.query(`
    SELECT * FROM products
    ORDER BY embeddings <-> '${vectorStr}'::vector
    LIMIT 10
  `, { type: QueryTypes.SELECT });
  return toEntityList(rows);
}
```

Nota: Usar parámetros parametrizados en producción para evitar SQL injection.
La sintaxis exacta depende de la versión de pgvector.

---

## Fase 3 — Migrar datos de MongoDB a PostgreSQL

### Ejecutar script de sincronización

```bash
node scripts/sync-pg.js
```

Lo que hace el script:
1. Conecta a MongoDB (usa `MONGO_URI` del .env)
2. Conecta a PostgreSQL (usa `DATABASE_URL` del .env)
3. Lee todos los documentos de MongoDB (Product, Store, User)
4. Hace `upsert` en PostgreSQL para cada documento
5. Muestra conteo final de registros en ambas DBs

### Verificar integridad

```sql
-- PostgreSQL
SELECT 'products' as tbl, count(*) FROM products
UNION ALL
SELECT 'stores', count(*) FROM stores
UNION ALL
SELECT 'users', count(*) FROM users;
```

```bash
# MongoDB
mongosh "mongodb+srv://..." --eval "
  db.products.count();
  db.stores.count();
  db.users.count();
"
```

Comparar que los conteos coincidan.

---

## Fase 4 — Eliminar dependencia de MongoDB

### Archivos a eliminar

| Archivo | Motivo |
|---|---|
| `src/models/Product.js` | Schema Mongoose con pre-save hook de embeddings |
| `src/models/Store.js` | Schema Mongoose |
| `src/models/User.js` | Schema Mongoose |
| `src/services/productService.js` | Lógica duplicada en use cases |
| `src/services/storeService.js` | Lógica duplicada en use cases |
| `src/services/userService.js` | Lógica duplicada en use cases |
| `src/services/chatService.js` | Reemplazado por AskChatbotUseCase |
| `src/services/aiService.js` | Reemplazado por GeminiAIAdapter |
| `src/services/imageService.js` | Reemplazado por FirebaseImageAdapter |
| `src/controllers/productController.js` | Reemplazado por framework/controllers |
| `src/controllers/storeController.js` | Reemplazado por framework/controllers |
| `src/controllers/userController.js` | Reemplazado por framework/controllers |
| `src/controllers/chatController.js` | Reemplazado por framework/controllers |
| `src/controllers/whatsappController.js` | Reemplazado por framework/controllers |
| `src/routes/productRoutes.js` | Reemplazado por framework/routes |
| `src/routes/storeRoutes.js` | Reemplazado por framework/routes |
| `src/routes/userRoutes.js` | Reemplazado por framework/routes |
| `src/routes/chatRoutes.js` | Reemplazado por framework/routes |
| `src/routes/whatsappRoutes.js` | Reemplazado por framework/routes |
| `src/middleware/authMiddleware.js` | Reemplazado por framework/middleware |
| `src/infrastructure/repositories/MongooseProductRepository.js` | Adapter de MongoDB |
| `src/infrastructure/repositories/MongooseStoreRepository.js` | Adapter de MongoDB |
| `src/infrastructure/repositories/MongooseUserRepository.js` | Adapter de MongoDB |
| `src/infrastructure/repositories/DualProductRepository.js` | Ya no necesario |
| `src/infrastructure/repositories/DualStoreRepository.js` | Ya no necesario |
| `src/infrastructure/repositories/DualUserRepository.js` | Ya no necesario |

### Dependencias npm a desinstalar

```bash
npm uninstall mongoose
```

### Variables de entorno a eliminar

Del archivo `.env`:

```
# Eliminar esta línea:
MONGO_URI=mongodb+srv://...
```

Y descomentar/agregar:

```
DATABASE_URL=postgresql://user:pass@host:5432/minventory
```

---

## Fase 5 — Ajustes post-migración

### IDs

| MongoDB | PostgreSQL |
|---|---|
| `ObjectId` (24 chars hex, ej: `6983ea87afadd3da007d491f`) | `UUID` (v4, ej: `550e8400-e29b-41d4-a716-446655440000`) |

Los repositorios ya hacen la conversión en `toEntity()` y `save()`. Pero verificar:

- `storeId` dentro de Product: actualmente guarda el ObjectId de MongoDB como string. PostgreSQL espera UUID. Si los IDs cambian, las referencias se pierden.
- **Solución**: Durante la migración, mantener el `_id` de MongoDB como `id` en PostgreSQL (el PostgresUserRepository usa `id` string, no UUID auto-generado).

### Token JWT

`BcryptAuthService.generateToken()` firma con `{ id: userId }`. Verificar que el frontend recibe el mismo formato de `id`.

### Embeddings pre-existentes

Los vectores de embedding en MongoDB son arrays de 768 números. El script `sync-pg.js` los migra como `JSONB`. Si se habilita pgvector, toca convertir la columna:

```sql
ALTER TABLE products ALTER COLUMN embeddings TYPE vector(768) USING embeddings::vector;
```

---

## Resumen de comandos

```bash
# 1. Asegurar PostgreSQL con pgvector
psql -d minventory -c "CREATE EXTENSION vector;"

# 2. Sincronizar datos
node scripts/sync-pg.js

# 3. Verificar integridad
psql -d minventory -c "SELECT 'products', count(*) FROM products UNION ALL SELECT 'stores', count(*) FROM stores UNION ALL SELECT 'users', count(*) FROM users;"

# 4. Cambiar DI container (Fase 1 - manual en container.js)

# 5. Eliminar archivos legacy
rm -rf src/models src/services src/controllers src/routes src/middleware
rm src/infrastructure/repositories/Mongoose*.js
rm src/infrastructure/repositories/Dual*.js

# 6. Desinstalar mongoose
npm uninstall mongoose

# 7. Actualizar .env
# Eliminar MONGO_URI, descomentar DATABASE_URL
```