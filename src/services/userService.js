const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getAll = async () => await User.find();





const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key_123', {
        expiresIn: '30d',
    });
};

const updateUser = async (id, userData) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    if (userData.password) {
        user.password = await bcrypt.hash(userData.password, 10);
    }
    if (userData.name) {
        user.name = userData.name;
    }
    if (userData.email) {
        user.email = userData.email;
    }
    return await user.save();
};

const getById = async (id) => await User.findById(id);

const registerUser = async (userData) => {
    const { email } = userData;
    const userExists = await User.findOne({ email });


    if (userExists) throw new Error('El usuario ya existe');



    const user = new User(userData);


    return await user.save();
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
        return {
            _id: user._id,
            name: user.name ?? null,
            email: user.email ?? null,
            token: generateToken(user._id)
        };
    } else {
        throw new Error('Credenciales inválidas');
    }
};

module.exports = { registerUser, loginUser, getAll, getById, updateUser };
