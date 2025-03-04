const OpenAI = require("openai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), ".env"), // adjust for env variables
});

console.log("check : " + process.env.DB_URI);

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.OPENROUTER_API_KEY, // key for the api openai
});

async function getDeepseekResponse(userMessage) {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "system", content: userMessage }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error in Deepseek API:", error);
    throw new Error("Error in Deepseek API");
  }
}

module.exports = { getDeepseekResponse };
