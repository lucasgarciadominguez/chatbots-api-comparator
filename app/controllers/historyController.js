const chatService = require("../services/chatService");

async function getChatHistory(req, res) {
  //gets the chat history
  try {
    const chatId = req.params.chatId;
    const history = chatService.getChatHistory(chatId);
    res.json({ chatId, history });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getChatHistory };
