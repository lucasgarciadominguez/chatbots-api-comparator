const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "30d" }, // Expires in 30 days
});

const User = mongoose.model("User", UserSchema); //takes the user name and converts it to lowercase and pluralizes it resulting in => "users" collection in MongoDB
//or specify it:  const User = mongoose.model("User", UserSchema, "users");
module.exports = User;
