require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const storeRoutes = require('./routes/storeRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error de conexión:', err));




app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use(whatsappRoutes);


app.get("/variables", (req, res) => {
    res.json({
        MONGO_URI: process.env.MONGO_URI,
        META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN,
        META_PHONE_NUMBER_ID: process.env.META_PHONE_NUMBER_ID,
        META_VERIFY_TOKEN: process.env.META_VERIFY_TOKEN,
    });
});


// Solo ejecuta listen si no estás en Vercel (entorno local)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
}
module.exports = app;

