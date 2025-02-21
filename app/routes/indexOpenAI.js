const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), ".env"), // adjust for env variables
});

const router = express.Router();

console.log("check : " + process.env.DB_URI);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // key for the api openai
});

// Root
router.get("/", async (req, res) => {
  try {
    res.json({ response: "Welcome to the chatbot api for chatgpt" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// endpoint for writing haikus
router.get("/haiku", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: "Write a haiku about AI" }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// endpoint for writing haikus
router.post("/chat", async (req, res) => {
  try {
    console.log("Body received:", req.body); //  Verify the request

    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error en OpenAI API:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
