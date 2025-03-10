const chats = {}; // on execution memory chats array

// obtains the chat history demanded
function getChatHistory(chatId) {
  return chats[chatId] || []; // if not, empty array
}

// Aggregates a message to the history
function addMessageToChat(chatId, role, message) {
  if (!chats[chatId]) {
    chats[chatId] = []; // if not, creates a new history
  }
  chats[chatId].push({ role, message });
}
module.exports = { getChatHistory, addMessageToChat };
