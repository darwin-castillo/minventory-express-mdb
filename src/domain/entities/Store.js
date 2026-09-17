class Store {
  constructor({ id, name, location, createdAt, updatedAt }) {
    this._id = id;
    this._name = name;
    this._location = location;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  get id() { return this._id; }
  get name() { return this._name; }
  get location() { return this._location; }
  get createdAt() { return this._createdAt; }
  get updatedAt() { return this._updatedAt; }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      location: this._location,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}

module.exports = Store;
