const { GoogleGenAI } = require("@google/genai");
const productService = require("./productService");
const { chatbotPrompt, CHAT_MODEL } = require("../config/prompts");

const ai = new GoogleGenAI({});

const askChatbot = async (userQuestion) => {
  const productsFound = await productService.smartSearch(userQuestion);

  const inventoryContext = productsFound
    .map((p) => `- Producto: ${p.name}, Precio: ${p.price}, Stock: ${p.stock}`)
    .join("\n");

  const prompt = chatbotPrompt({ inventoryContext, userQuestion });

  const result = await ai.models.generateContent({
    model: CHAT_MODEL,
    contents: prompt,
  });

  return result.text;
};

module.exports = { askChatbot };
