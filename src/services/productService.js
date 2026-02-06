const Product = require('../models/Product');

const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};
const getProducts = async () => {
    return await Product.find();
};

const getInventoryByStore = async (storeId) => {
    return await Product.find({ store: storeId }).populate('store');
};
const getProductById = async (id) => {
    return await Product.findOne({ id: id })
}



module.exports = { createProduct, getInventoryByStore, getProducts, getProductById };