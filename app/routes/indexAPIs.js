const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController"); // Import controller

// Root
router.get("/", async (req, res) => {
  try {
    res.json({ response: "Welcome to the chatbot APIs" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for chatting (calls the controller)
router.post("/chat", chatController.chatWithBoth);

module.exports = router;
