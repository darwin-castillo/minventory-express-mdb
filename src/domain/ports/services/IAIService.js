class IAIService {
  async generateEmbedding(text) {
    throw new Error('IAIService.generateEmbedding() not implemented');
  }

  async generateChatResponse(prompt) {
    throw new Error('IAIService.generateChatResponse() not implemented');
  }
}

module.exports = IAIService;
