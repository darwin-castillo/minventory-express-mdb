
const GoogleGenAI = require("@google/genai");
const axios = require("axios");



const generateEmbedding = async (text) => {
    try {

        console.log("texto a embedir", text);
        //   const ai = new GoogleGenAI({});
        const response = await axios({
            method: "POST",
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent",
            data: {
                "content": {
                    "parts": [
                        {
                            "text": text
                        }
                    ]
                },
                "output_dimensionality": 768
            },
            headers: {

                "Content-Type": "application/json",
                "x-goog-api-key": process.env.GEMINI_API_KEY,
            },
        });


        // const model = await ai.models.embedContent({
        //     model: 'gemini-embedding-001',
        //     contents: text,
        //     outputDimensionality: 768,
        // });

        // 2. Intentamos la llamada
        //  const result = await model.embedContent(text);
        //  return result.embedding.values;

        return response.data.embedding.values;

    } catch (error) {
        // Si falla, es probable que sea por la versión del modelo en tu región.
        // El modelo 'embedding-001' es el más compatible a nivel global.
        console.warn("⚠️ Falló text-embedding-001, intentando con embedding-001...", error);

        // try {
        //     const ai = new GoogleGenAI({});
        //     const fallbackModel = ai.models.getGenerativeModel({ model: "embedding-001" });
        //     const res = await fallbackModel.embedContent(text);
        //     return res.embedding.values;
        // } catch (fallbackError) {
        //     console.error("❌ Error total en Google AI:", fallbackError.message);
        //     throw new Error("No se pudo conectar con los modelos de Google AI.");
        // }
    }
};

module.exports = { generateEmbedding };