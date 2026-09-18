const { success, error } = require('../../utils/responseHandler');

function makeProductController(useCases) {
  return {
    createProduct: async (req, res) => {
      try {
        const product = await useCases.create.execute({ ...req.body, storeId: req.body.store });
        success(res, product, 'Producto creado con éxito', 201);
      } catch (err) {
        error(res, err.message, err.status || 400);
      }
    },

    getAllProducts: async (req, res) => {
      try {
        const products = await useCases.getAll.execute();
        success(res, products);
      } catch (err) {
        error(res, 'Error al obtener productos: ' + err.message);
      }
    },

    getProductById: async (req, res) => {
      try {
        const product = await useCases.getById.execute(req.params.id);
        success(res, product);
      } catch (err) {
        error(res, err.message, err.status || 404);
      }
    },

    getProductsByStore: async (req, res) => {
      try {
        const products = await useCases.getByStore.execute(req.params.storeId);
        success(res, products);
      } catch (err) {
        error(res, err.message);
      }
    },

    updateProduct: async (req, res) => {
      try {
        const product = await useCases.update.execute(req.params.id, req.body);
        success(res, product);
      } catch (err) {
        error(res, err.message, err.status || 400);
      }
    },

    deleteProduct: async (req, res) => {
      try {
        await useCases.delete.execute(req.params.id);
        success(res, null, 'Producto eliminado con éxito');
      } catch (err) {
        error(res, err.message, err.status || 404);
      }
    },
  };
}

module.exports = makeProductController;