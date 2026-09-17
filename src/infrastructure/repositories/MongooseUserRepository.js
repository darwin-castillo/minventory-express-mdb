const { User } = require('../../domain');
const UserModel = require('../../models/User');

function toEntity(doc) {
  if (!doc) return null;
  return new User({
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    password: doc.password,
    role: doc.role,
  });
}

function toEntityList(docs) {
  return docs.map(toEntity);
}

class MongooseUserRepository {
  async findAll() {
    const docs = await UserModel.find();
    return toEntityList(docs);
  }

  async findById(id) {
    const doc = await UserModel.findById(id);
    return toEntity(doc);
  }

  async findByEmail(email) {
    const doc = await UserModel.findOne({ email });
    return toEntity(doc);
  }

  async save(user) {
    const doc = await new UserModel({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    }).save();
    return toEntity(doc);
  }

  async update(id, data) {
    const doc = await UserModel.findById(id);
    if (!doc) return null;
    if (data.name) doc.name = data.name;
    if (data.email) doc.email = data.email;
    if (data.password) doc.password = data.password;
    if (data.role) doc.role = data.role;
    const updated = await doc.save();
    return toEntity(updated);
  }
}

module.exports = MongooseUserRepository;