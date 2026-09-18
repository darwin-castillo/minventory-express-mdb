const { success, error } = require('../../utils/responseHandler');

function makeUserController(useCases) {
  return {
    register: async (req, res) => {
      try {
        const data = await useCases.register.execute(req.body);
        success(res, data, 'Usuario registrado con éxito', 201);
      } catch (err) {
        error(res, 'error_' + err.message, err.status || 400);
      }
    },

    login: async (req, res) => {
      try {
        const data = await useCases.login.execute(req.body.email, req.body.password);
        success(res, data, 'Usuario logueado con éxito');
      } catch (err) {
        error(res, err.message, err.status || 401);
      }
    },

    getAll: async (req, res) => {
      try {
        const data = await useCases.getAll.execute();
        success(res, data);
      } catch (err) {
        error(res, err.message);
      }
    },

    getById: async (req, res) => {
      try {
        const data = await useCases.getById.execute(req.params.id);
        success(res, data);
      } catch (err) {
        error(res, err.message, err.status || 404);
      }
    },

    updateUser: async (req, res) => {
      try {
        const data = await useCases.update.execute(req.params.id, req.body);
        success(res, data, 'Usuario actualizado con éxito');
      } catch (err) {
        error(res, err.message, err.status || 400);
      }
    },
  };
}

module.exports = makeUserController;