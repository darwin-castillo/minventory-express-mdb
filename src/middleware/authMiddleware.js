// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // El token suele enviarse como "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token con la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Añadimos los datos del usuario decodificados al objeto request
            req.user = decoded;

            next(); // Continuar al siguiente controlador
        } catch (error) {
            return res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

module.exports = { protect };