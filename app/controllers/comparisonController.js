const chatgptService = require("../services/openAIService");
const deepseekService = require("../services/deepseekService");
const comparisonService = require("../services/comparisonService");

async function compareModels(req, res) {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const [responseGPT, responseDeepseek] = await Promise.all([
      chatgptService.getChatGptResponse(userMessage),
      deepseekService.getDeepseekResponse(userMessage),
    ]);

    const similarityScore = comparisonService.compareResponses(
      responseGPT,
      responseDeepseek
    );

    res.json({
      chatgpt: responseGPT,
      deepseek: responseDeepseek,
      similarity: similarityScore, // 0.00 (very different) - 1.00 (identical)
    });
  } catch (error) {
    console.error("Error in comparisonController:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { compareModels };
