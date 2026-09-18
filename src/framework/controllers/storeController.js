const { success, error } = require('../../utils/responseHandler');

function makeStoreController(useCases) {
  return {
    createStore: async (req, res) => {
      try {
        const store = await useCases.create.execute(req.body);
        success(res, store, 'Tienda creada con éxito', 201);
      } catch (err) {
        error(res, err.message, err.status || 400);
      }
    },

    getAllStores: async (req, res) => {
      try {
        const stores = await useCases.getAll.execute();
        success(res, stores);
      } catch (err) {
        error(res, err.message);
      }
    },

    getStoreById: async (req, res) => {
      try {
        const store = await useCases.getById.execute(req.params.id);
        success(res, store);
      } catch (err) {
        error(res, err.message, err.status || 404);
      }
    },

    updateStore: async (req, res) => {
      try {
        const store = await useCases.update.execute(req.params.id, req.body);
        success(res, store);
      } catch (err) {
        error(res, err.message, err.status || 400);
      }
    },

    deleteStore: async (req, res) => {
      try {
        await useCases.delete.execute(req.params.id);
        success(res, null, 'Tienda eliminada con éxito');
      } catch (err) {
        error(res, err.message, err.status || 404);
      }
    },
  };
}

module.exports = makeStoreController;