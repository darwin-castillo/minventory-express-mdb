const axios = require('axios');
const { GoogleGenAI } = require('@google/genai');

class GeminiAIAdapter {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.chatClient = new GoogleGenAI({ apiKey: this.apiKey });
  }

  async generateEmbedding(text) {
    const response = await axios({
      method: 'POST',
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent',
      data: {
        content: { parts: [{ text }] },
        outputDimensionality: 768,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': this.apiKey,
      },
    });
    return response.data.embedding.values;
  }

  async generateChatResponse(prompt) {
    const result = await this.chatClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return result.text;
  }
}

module.exports = GeminiAIAdapter;