const response = require('../utils/responseHandler');
const storeService = require('../services/storeService');

const createStore = async (req, res) => {
    try {
        const store = await storeService.createStore(req.body);
        response.success(res, store);
    } catch (error) {
        response.error(res, error.message);
    }
};

const getAllStores = async (req, res) => {
    try {
        const stores = await storeService.getAllStores();
        response.success(res, stores);
    } catch (error) {
        response.error(res, error.message);
    }
};

const getStoreById = async (req, res) => {
    try {
        const store = await storeService.getStoreById(req.params.id);
        response.success(res, store);
    } catch (error) {
        response.error(res, error.message);
    }
};

const updateStore = async (req, res) => {
    try {
        const store = await storeService.updateStore(req.params.id, req.body);
        response.success(res, store);
    } catch (error) {
        response.error(res, error.message);
    }
};

const deleteStore = async (req, res) => {
    try {
        const store = await storeService.deleteStore(req.params.id);
        response.success(res, store);
    } catch (error) {
        response.error(res, error.message);
    }
};

module.exports = {
    createStore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore
};