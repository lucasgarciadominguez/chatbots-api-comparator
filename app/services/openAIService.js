const OpenAI = require("openai");
const dotenv = require("dotenv");
const path = require("path");
const timerService = require("../services/timerService");

dotenv.config({
  path: path.resolve(process.cwd(), ".env"), // adjust for env variables
});

console.log("check : " + process.env.DB_URI);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // key for the api openai
});

// function for chatting service
async function getChatGptResponse(history, userMessage, responseTimes) {
  try {
    const start = Date.now(); // Saves the moment where it starts

    const messages = history.map((msg) => ({
      role: msg.role,
      content: msg.message,
    }));
    messages.push({ role: "user", content: userMessage }); //push a message with the role of "user" (message sent by user) to the api

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });
    responseTimes.deepseek = timerService.calculateTime(start);

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error in OpenAI API:", error);
    throw new Error("Error in OpenAI API");
  }
}

module.exports = { getChatGptResponse };
