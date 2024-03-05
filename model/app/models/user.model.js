const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    id: mongoose.Schema.Types.ObjectId,
  })
);

module.exports = User;
