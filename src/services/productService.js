const Product = require('../models/Product');
const aiService = require('./aiService');
const imageService = require('./imageService');

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
const updateProduct = async (id, productData) => {
    console.log('updateProduct');
    const product = await Product.findById(id);
    if (!product) {
        throw new Error('Producto no encontrado');
    }
    console.log(productData.images);
    if (productData.images) {
        const images = [];
        let imgIndex = 1;
        for (const image of productData.images) {

            const img = await imageService.uploadImage(image, `products/${id}/${imgIndex++}.${image.split('.').pop()}`);
            console.log(img);
            images.push(img);
        }
        productData.images = images;
    }
    return await Product.findByIdAndUpdate(id, productData, { new: true });
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



module.exports = { createProduct, getInventoryByStore, getProducts, getProductById, smartSearch, updateProduct };