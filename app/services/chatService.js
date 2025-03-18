const Chat = require("../model/Chat");

// obtains the chat history demanded from mongoDB
async function getChatHistory(chatId) {
  try {
    let chat = await Chat.findOne({ chatId });

    if (!chat) {
      chat = new Chat({ chatId, history: [] });
      await chat.save();
    }

    return chat.history;
  } catch (error) {
    console.error("Error obtaining history from the chat:", error);
    return [];
  }
}

// Aggregates a message to the history chat in MongoDB
async function addMessageToChat(chatId, role, message) {
  try {
    let chat = await Chat.findOne({ chatId });

    if (!chat) {
      chat = new Chat({ chatId, history: [] });
    }

    chat.history.push({ role, message });
    await chat.save();
  } catch (error) {
    console.error("Error aggregating message to the chat:", error);
  }
}

module.exports = { getChatHistory, addMessageToChat };
