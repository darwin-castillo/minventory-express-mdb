const axios = require('axios');

// Función para verificar el Webhook (Requerido por Meta)
exports.verifyWebhook = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === process.env.META_VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }


};

// --- WHATSAPP WEBHOOK HANDLER (META VERSION) ---
exports.handleWhatsApp = async (req, res) => {
    try {
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const message = changes?.value?.messages?.[0];

        if (message && message.type === 'text') {
            const phoneNumber = message.from; // Número del cliente
            const incomingMsg = message.text.body.trim();

            // 1. Buscar producto
            const product = await Product.findOne({
                name: { $regex: new RegExp(incomingMsg, "i") }
            });

            let responseText = "❌ Disculpa, no encontramos coincidencias con tu búsqueda.";
            if (product) {
                responseText = `📦 *${product.name}*\n\n` +
                    `💰 Precio: $${product.price}\n` +
                    `📝 Info: ${product.description}\n` +
                    `🔢 Stock: ${product.stock} units`;
            }

            // 2. Enviar respuesta vía Meta API
            await axios({
                method: "POST",
                url: `https://graph.facebook.com/v18.0/${process.env.META_PHONE_NUMBER_ID}/messages`,
                data: {
                    messaging_product: "whatsapp",
                    to: phoneNumber,
                    text: { body: responseText },
                },
                headers: { "Authorization": `Bearer ${process.env.META_ACCESS_TOKEN}` },
            });
        }

        // Meta requiere un 200 OK para confirmar recepción
        res.sendStatus(200);
    } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        res.sendStatus(500);
    }
};
