const Chat = require("../model/Chat");

// generates unique chatID
async function getChatID() {
  return Date.now().toString();
}

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
    return getMessageIdByIndex(chatId, chat.history.length - 1); //return the id from the last message of the list
  } catch (error) {
    console.error("Error aggregating message to the chat:", error);
  }
}

// Function to get the message ID by index
async function getMessageIdByIndex(chatId, index) {
  try {
    // Find the chat in the database
    const chat = await Chat.findOne({ chatId });

    // If the chat doesn't exist or has no history, return null
    if (!chat || chat.history.length === 0) {
      console.log("Chat not found or empty history.");
      return null;
    }

    // Check if the requested index is within bounds
    if (index < 0 || index >= chat.history.length) {
      console.log("Invalid index: out of bounds.");
      return null;
    }

    // Return the _id of the message at the specified index
    return chat.history[index]._id;
  } catch (error) {
    console.error("Error getting message ID by index:", error);
    return null;
  }
}

module.exports = {
  getChatID,
  getMessageIdByIndex,
  getChatHistory,
  addMessageToChat,
};
