const { success, error } = require('../../utils/responseHandler');

function makeChatController(useCases) {
  return {
    chat: async (req, res) => {
      try {
        const { question } = req.body;
        const answer = await useCases.ask.execute(question);
        success(res, { answer });
      } catch (err) {
        error(res, err.message);
      }
    },
  };
}

module.exports = makeChatController;