const Product = require('../models/Product');
const response = require('../utils/responseHandler');


// --- OPERACIONES CRUD PARA API ---

const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        response.success(res, newProduct, 'Producto creado con éxito', 201);
    } catch (error) {
        response.error(res, error.message, 400);
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        response.success(res, products); // Por defecto usa status 200 y mensaje "Ok"
    } catch (err) {
        response.error(res, 'Error al obtener productos: ' + err);
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        response.success(res, product);
    } catch (err) {
        response.error(res, 'Error al obtener productos');
    }
}

exports.updateProduct = async (req, res) => {
    response.success(res);
}
exports.deleteProduct = async (req, res) => {
    response.success(res);
}

