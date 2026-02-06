// src/controllers/chatController.js
const chatService = require('../services/chatService');
const response = require('../utils/responseHandler');

const chat = async (req, res) => {
    try {
        const { question } = req.body;
        const answer = await chatService.askChatbot(question);
        response.success(res, { answer });
    } catch (err) {
        response.error(res, err.message);
    }
};

module.exports = { chat };