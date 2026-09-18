const axios = require('axios');
const chatService = require('../../services/chatService');

function makeWhatsAppController() {
  return {
    verifyWebhook: (req, res) => {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (mode && token === process.env.META_VERIFY_TOKEN) {
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    },

    handleWhatsApp: async (req, res) => {
      try {
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const message = changes?.value?.messages?.[0];

        if (message && message.type === 'text') {
          const phoneNumber = message.from;
          const incomingMsg = message.text.body.trim();
          const responseText = await chatService.askChatbot(incomingMsg);

          await axios({
            method: 'POST',
            url: `https://graph.facebook.com/v18.0/${process.env.META_PHONE_NUMBER_ID}/messages`,
            data: {
              messaging_product: 'whatsapp',
              to: phoneNumber,
              text: { body: responseText },
            },
            headers: { Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}` },
          });
        }

        res.sendStatus(200);
      } catch (err) {
        console.error('Error:', err.response?.data || err.message);
        res.sendStatus(500);
      }
    },
  };
}

module.exports = makeWhatsAppController;