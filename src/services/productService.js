const Product = require('../models/Product');
const aiService = require('./aiService');

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
const smartSearch = async (queryText) => {
    const queryVector = await aiService.generateEmbedding(queryText);

    return await Product.aggregate([
        {
            $vectorSearch: {
                index: "vector_index", // Nombre del índice en MongoDB Atlas
                path: "embeddings",
                queryVector: queryVector,
                numCandidates: 100,
                limit: 10
            }
        }
    ]);
};



module.exports = { createProduct, getInventoryByStore, getProducts, getProductById, smartSearch };