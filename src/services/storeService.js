const Store = require('../models/Store');

const createStore = async (storeData) => {
    try {
        const store = new Store(storeData);
        return await store.save();
    } catch (error) {
        throw error;
    }
};

const getAllStores = async () => {
    try {
        return await Store.find();
    } catch (error) {
        throw error;
    }
};

const getStoreById = async (id) => {
    try {
        return await Store.findById(id);
    } catch (error) {
        throw error;
    }
};

const updateStore = async (id, storeData) => {
    try {
        return await Store.findByIdAndUpdate(id, storeData, { new: true });
    } catch (error) {
        throw error;
    }
};

const deleteStore = async (id) => {
    try {
        return await Store.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createStore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore
};
