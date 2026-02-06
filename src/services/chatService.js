// src/services/chatService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const productService = require("./productService");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const askChatbot = async (userQuestion) => {
  // 1. Buscamos productos relacionados en la base de datos
  const productsFound = await productService.smartSearch(userQuestion);

  // 2. Formateamos los productos para que la IA los entienda
  const inventoryContext = productsFound.map(p =>
    `- Producto: ${p.name}, Precio: ${p.price}, Stock: ${p.stock}, Categoría: ${p.category}`
  ).join("\n");

  // 3. Generamos la respuesta con Gemini
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", });

  const prompt = `
    Actúa como un asistente de ventas de tecnología experto y amable.
    Basado en este inventario real:
    ${inventoryContext}

    Pregunta del cliente: "${userQuestion}"

    Instrucciones:
    - Si hay productos que coinciden, recomiéndalos resaltando sus beneficios.
    - Si el stock es bajo (menos de 3), advierte al cliente.
    - Si no encuentras nada, dile que contacte a Claudia Hoyos (+584143381704) para pedidos especiales.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

module.exports = { askChatbot };