const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    category: { type: String, required: true, index: true }, // 👈 Agregado con índice para búsquedas rápidas
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: {
        type: [String],
        default: [],
        validate: [arrayLimit, '{PATH} excede el límite de 5 imágenes'] // Validación opcional
    },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }
}, { timestamps: true }); 8

function arrayLimit(val) {
    return val.length <= 5;
}
module.exports = mongoose.model('Product', ProductSchema);