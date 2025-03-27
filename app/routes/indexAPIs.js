const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController"); // Imports controllers
const comparisonController = require("../controllers/comparisonController");
const historyController = require("../controllers/historyController");
const newChatController = require("../controllers/newChatController");

// Root
router.get("/", async (req, res) => {
  try {
    res.json({ response: "Welcome to the chatbot APIs" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for creating a new chat
router.post("/new-chat", newChatController.createNewChat);

// Route for obtaining th chatHistory with a chatid
router.get("/chat/:chatId", historyController.getChatHistory);

// Route for chatting (calls the controller)
router.post("/chat", chatController.chatWithBoth);
// Route for comparison (calls the controller)
router.post("/comparison", comparisonController.compareModels);
module.exports = router;
