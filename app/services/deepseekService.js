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
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

// Root
router.get("/", async (req, res) => {
  try {
    res.json({ response: "Welcome to the chatbot api for deepseek" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// endpoint for writing haikus
router.get("/haiku", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "system", content: "Write a haiku about AI" }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getDeepseekResponse(userMessage) {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: userMessage }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error en OpenAI API:", error);
    throw new Error("Error en OpenAI API");
  }
}

module.exports = { getDeepseekResponse };
