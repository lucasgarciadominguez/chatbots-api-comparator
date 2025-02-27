const openAIService = require("../services/openAIService");
// const deepseekService = require("../services/deepseekService"); //

// Method that calls only ChatGPT
async function chatWithOpenAIChatGPT(req, res) {
  try {
    console.log("Body received:", req.body);

    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const responseGPT = await openAIService.getChatGptResponse(userMessage);
    res.json({ response: responseGPT });
  } catch (error) {
    console.error("Error in the controller:", error);
    res.status(500).json({ error: error.message });
  }
}

// Method to call both APIs (ChatGPT + Deepseek)
/*
async function chatWithBoth(req, res) {
  try {
    console.log("Body received:", req.body);

    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call both APIs in parallel
    const [responseGPT, responseDeepseek] = await Promise.all([
      chatgptService.getChatGptResponse(userMessage),
      deepseekService.getDeepseekResponse(userMessage),
    ]);

    // Concatenate responses
    const combinedResponse = `${responseGPT}\n\n${responseDeepseek}`;

    res.json({ response: combinedResponse });
  } catch (error) {
    console.error("Error in the controller:", error);
    res.status(500).json({ error: error.message });
  }
}
*/

module.exports = { chatWithOpenAIChatGPT /*, chatWithBoth */ };
