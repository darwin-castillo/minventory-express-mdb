const { Price, Stock } = require('../value-objects');
const { ImageLimitExceededError } = require('../errors');

const MAX_IMAGES = 5;

class Product {
  constructor({ id, name, description, category, price, cost, stock, images, storeId, embeddings, createdAt, updatedAt }) {
    this._id = id;
    this._name = name;
    this._description = description || '';
    this._category = category;
    this._price = price instanceof Price ? price : new Price(price);
    this._cost = cost instanceof Price ? cost : new Price(cost);
    this._stock = stock instanceof Stock ? stock : new Stock(stock);
    this._images = images || [];
    this._storeId = storeId;
    this._embeddings = embeddings || [];
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  get id() { return this._id; }
  get name() { return this._name; }
  get description() { return this._description; }
  get category() { return this._category; }
  get price() { return this._price.value; }
  get cost() { return this._cost.value; }
  get stock() { return this._stock.value; }
  get images() { return [...this._images]; }
  get storeId() { return this._storeId; }
  get embeddings() { return [...this._embeddings]; }
  get createdAt() { return this._createdAt; }
  get updatedAt() { return this._updatedAt; }

  isLowStock(threshold = 3) {
    return this._stock.isLow(threshold);
  }

  getProfitMargin() {
    if (this._cost.value === 0) return 0;
    return ((this._price.value - this._cost.value) / this._cost.value) * 100;
  }

  addImage(imageUrl) {
    if (this._images.length >= MAX_IMAGES) {
      throw new ImageLimitExceededError();
    }
    this._images.push(imageUrl);
  }

  buildEmbeddingText() {
    return `${this._name} ${this._description} ${this._category} ${this._category}`;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      category: this._category,
      price: this._price.value,
      cost: this._cost.value,
      stock: this._stock.value,
      images: [...this._images],
      storeId: this._storeId,
      embeddings: [...this._embeddings],
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}

module.exports = Product;
