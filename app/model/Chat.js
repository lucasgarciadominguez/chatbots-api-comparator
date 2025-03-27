const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true, index: true },
  history: [
    {
      role: { type: String, enum: ["user", "assistant"], required: true },
      message: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now, expires: "30d" }, // Expires in 30 days
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
