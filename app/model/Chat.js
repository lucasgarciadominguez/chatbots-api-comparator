const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  history: [
    {
      role: { type: String, enum: ["user", "assistant"], required: true },
      message: { type: String, required: true },
    },
  ],
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
