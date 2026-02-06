const userService = require('../services/userService');
const response = require('../utils/responseHandler');

const getAll = async (req, res) => {
  try {
    const data = await userService.getAll();
    response.success(res, data);
  } catch (err) {
    response.error(res, err.message);
  }
};

const register = async (req, res) => {
  try {
    const data = await userService.registerUser(req.body);
    response.success(res, data, 'Usuario registrado con éxito', 201);
  } catch (err) {
    response.error(res, "error_" + err.message);
  }
};

const login = async (req, res) => {
  try {
    const data = await userService.loginUser(req.body.email, req.body.password);
    response.success(res, data, 'Usuario logueado con éxito');
  } catch (err) {
    response.error(res, err.message);
  }
};


module.exports = { getAll, register, login };