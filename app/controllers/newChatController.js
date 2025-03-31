const chatService = require("../services/chatService");

// Controller function to create a new chat
async function createNewChat(req, res) {
  try {
    const chatId = await chatService.getChatID();
    res.json({ chatId });
  } catch (error) {
    console.error("Error creating new chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { createNewChat };
