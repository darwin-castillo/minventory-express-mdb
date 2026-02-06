// src/services/chatService.js
const { GoogleGenAI } = require("@google/genai");
const productService = require("./productService");

const ai = new GoogleGenAI({});

const askChatbot = async (userQuestion) => {
  // 1. Buscamos productos relacionados en la base de datos
  const productsFound = await productService.smartSearch(userQuestion);

  // 2. Formateamos los productos para que la IA los entienda
  const inventoryContext = productsFound.map(p =>
    `- Producto: ${p.name}, Precio: ${p.price}, Stock: ${p.stock}`
  ).join("\n");


  const prompt = `
    Actúa como un asistente de ventas de tecnología experto y amable.
    Basado en este inventario real:
    ${inventoryContext}

    Pregunta del cliente: "${userQuestion}"

    Instrucciones:
    - Si el cliente solo saluda, responde con un saludo amable.
    - Si el cliente solo pregunta por el precio, responde con el precio del producto.
    - Si el cliente solo pregunta por el stock, responde con el stock del producto.
    - Si el cliente solo pregunta por el nombre del producto, responde con el nombre del producto.
    - Si hay productos que coinciden, recomiéndalos resaltando sus beneficios.
    - Si el stock es bajo (menos de 3), advierte al cliente.
    - Si no encuentras nada, dile que contacte a Darwin Castillo (+584247695308) para pedidos especiales.
  `;
  // 3. Generamos la respuesta con Gemini
  const result = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });



  //const result = await model.generateContent(prompt);
  // return result.response.text();
  return result.text;
};

module.exports = { askChatbot };