const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/authMiddleware");

const chatController = require("../controllers/chatController"); // Imports controllers
const comparisonController = require("../controllers/comparisonController");
const historyController = require("../controllers/historyController");
const newChatController = require("../controllers/newChatController");
const authController = require("../controllers/authController");

// Root
router.get("/", async (req, res) => {
  try {
    res.json({ response: "Welcome to the chatbot APIs" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Route for creating a new chat
router.post("/new-chat", authenticateToken, newChatController.createNewChat);

// Route for obtaining th chatHistory with a chatid
router.get(
  "/chat/:chatId",
  authenticateToken,
  historyController.getChatHistory
);

// Route for chatting (calls the controller)
router.post("/chat", authenticateToken, chatController.chatWithBoth);
// Route for comparison (calls the controller)
router.post(
  "/comparison",
  authenticateToken,
  comparisonController.compareModels
);
module.exports = router;
