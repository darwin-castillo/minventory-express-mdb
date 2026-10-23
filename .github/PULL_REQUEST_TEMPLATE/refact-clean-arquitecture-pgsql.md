## Summary

This PR introduces a **Clean Architecture** refactor to the project, establishing clear separation of concerns across domain, application, and infrastructure layers. It also adds a **migration plan from MongoDB to PostgreSQL** and wires everything together via a dependency injection container.

## Changes

### 🏗️ Clean Architecture Layers (`02284b0`)
- **Domain layer**: Entities (`Product`, `Store`, `User`), value objects (`Email`, `Price`, `Stock`), domain errors, repository ports, and service interfaces
- **Application layer**: Use cases organized by feature — `products/`, `stores/`, `users/`, `chat/`
- **Infrastructure layer**: Concrete implementations — `MongooseProductRepository`, `MongooseStoreRepository`, `MongooseUserRepository`, `BcryptAuthService`, `FirebaseImageAdapter`, `GeminiAIAdapter`

### 🔌 Framework Layer with DI (`1f6b2fa`)
- Controllers, routes, and DI container (`src/framework/`)
- Express routes wired through the DI container
- WhatsApp controller with chatbot integration using domain-driven use cases

### 📄 Migration Plan (`41d6437`)
- Comprehensive guide for migrating from MongoDB to PostgreSQL ([docs/MIGRATE-MONGO-to-POSTGRES.md](./docs/MIGRATE-MONGO-to-POSTGRES.md))
- Covers schema mapping, gradual migration strategy, and rollback plan

## Stats
- **+1,846 / −29** lines across **74 files**
- New directories: `domain/`, `application/`, `framework/`, `infrastructure/`