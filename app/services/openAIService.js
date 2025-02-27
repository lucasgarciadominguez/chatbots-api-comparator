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

// function for chatting service
async function getChatGptResponse(userMessage) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error en OpenAI API:", error);
    throw new Error("Error en OpenAI API");
  }
}

module.exports = { getChatGptResponse };
