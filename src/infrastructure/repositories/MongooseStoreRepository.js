const { Store } = require('../../domain');
const StoreModel = require('../../models/Store');

function toEntity(doc) {
  if (!doc) return null;
  return new Store({
    id: doc._id.toString(),
    name: doc.name,
    location: doc.location,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  });
}

function toEntityList(docs) {
  return docs.map(toEntity);
}

class MongooseStoreRepository {
  async findAll() {
    const docs = await StoreModel.find();
    return toEntityList(docs);
  }

  async findById(id) {
    const doc = await StoreModel.findById(id);
    return toEntity(doc);
  }

  async save(store) {
    const doc = await new StoreModel({
      name: store.name,
      location: store.location,
    }).save();
    return toEntity(doc);
  }

  async update(id, data) {
    const doc = await StoreModel.findByIdAndUpdate(id, data, { new: true });
    return toEntity(doc);
  }

  async delete(id) {
    return await StoreModel.findByIdAndDelete(id);
  }
}

module.exports = MongooseStoreRepository;