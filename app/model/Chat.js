const mongoose = require("mongoose"); //like an ORM but for MongoDB. It's called ODM (Object Document Mapper)
//structure of documents of type "Chat"
const ChatSchema = new mongoose.Schema({
  //works as an ORM mapping documents JSON in MongoDB
  chatId: { type: String, required: true, unique: true, index: true }, //uses indexes for fast searches
  history: [
    {
      role: { type: String, enum: ["user", "assistant"], required: true },
      message: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now, expires: "30d" }, // Expires in 30 days
});

const Chat = mongoose.model("Chat", ChatSchema); //register this schema as a "model" reusable

module.exports = Chat;
