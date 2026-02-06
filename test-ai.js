require('dotenv').config();
const aiService = require('./src/services/aiService');

async function test() {
    try {
        const vector = await aiService.generateEmbedding("Probando teléfonos inteligentes con Hugging Face");
        console.log("✅ ¡Conexión exitosa!");
        console.log("Vector generado con tamaño:", vector.length); // Debería decir 384
    } catch (e) {
        console.error(e.message);
    }
}
test();