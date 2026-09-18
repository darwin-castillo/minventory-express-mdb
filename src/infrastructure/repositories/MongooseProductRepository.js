const { Product } = require('../../domain');
const ProductModel = require('../../models/Product');

function toEntity(doc) {
  if (!doc) return null;
  return new Product({
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    category: doc.category,
    price: doc.price ?? 0,
    cost: doc.cost ?? 0,
    stock: doc.stock ?? 0,
    images: doc.images || [],
    storeId: doc.store ? (typeof doc.store === 'object' ? doc.store._id.toString() : doc.store.toString()) : null,
    embeddings: doc.embeddings || [],
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  });
}

function toEntityList(docs) {
  return docs.map(toEntity);
}

class MongooseProductRepository {
  async findAll() {
    const docs = await ProductModel.find();
    return toEntityList(docs);
  }

  async findById(id) {
    const doc = await ProductModel.findById(id);
    return toEntity(doc);
  }

  async findByStore(storeId) {
    const docs = await ProductModel.find({ store: storeId }).populate('store');
    return toEntityList(docs);
  }

  async save(product) {
    const pojo = {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      cost: product.cost,
      stock: product.stock,
      images: product.images,
      store: product.storeId,
      embeddings: product.embeddings,
    };
    const doc = await new ProductModel(pojo).save();
    return toEntity(doc);
  }

  async update(id, data) {
    const updateData = { ...data };
    if (updateData.storeId) {
      updateData.store = updateData.storeId;
      delete updateData.storeId;
    }
    const doc = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
    return toEntity(doc);
  }

  async delete(id) {
    await ProductModel.findByIdAndDelete(id);
  }

  async smartSearch(queryVector) {
    const docs = await ProductModel.aggregate([
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embeddings',
          queryVector,
          numCandidates: 100,
          limit: 10,
        },
      },
    ]);
    return toEntityList(docs);
  }
}

module.exports = MongooseProductRepository;