const openAIService = require("../services/openAIService");
const deepseekService = require("../services/deepseekService");
const chatService = require("../services/chatService");

// Method that calls only ChatGPT
async function chatWithOpenAIChatGPT(req, res) {
  try {
    console.log("Body received:", req.body);
    const { chatId, userMessage } = req.body;

    if (!chatId || !userMessage) {
      return res.status(400).json({ error: "chatId and message are required" });
    }
    const history = chatService.getChatHistory(chatId);

    const responseGPT = await openAIService.getChatGptResponse(
      history,
      userMessage
    );
    chatService.addMessageToChat(chatId, "user", userMessage);
    res.json({ response: responseGPT });
  } catch (error) {
    console.error("Error in the controller:", error);
    res.status(500).json({ error: error.userMessage });
  }
}

// Method that calls only Deepseek
async function chatWithDeepseek(req, res) {
  try {
    console.log("Body received:", req.body);

    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const responseDeepseek = await openAIService.getDeepseekResponse(
      userMessage
    );
    res.json({ response: responseDeepseek });
  } catch (error) {
    console.error("Error in the controller:", error);
    res.status(500).json({ error: error.message });
  }
}

// Method to call both APIs (ChatGPT + Deepseek)

async function chatWithBoth(req, res) {
  try {
    console.log("Body received:", req.body);

    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call both APIs in parallel
    const [responseGPT, responseDeepseek] = await Promise.all([
      openAIService.getChatGptResponse(userMessage),
      deepseekService.getDeepseekResponse(userMessage),
    ]);

    // Concatenate responses
    const combinedResponse = `Response GPT: ${responseGPT} Response Deepseek: ${responseDeepseek}`;

    res.json({ response: combinedResponse });
  } catch (error) {
    console.error("Error in the controller:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { chatWithBoth, chatWithOpenAIChatGPT };
