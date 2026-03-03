require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const storeRoutes = require('./routes/storeRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error de conexión:', err));




app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use(whatsappRoutes);





// Solo ejecuta listen si no estás en Vercel (entorno local)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
}
module.exports = app;

