const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pernum: { type: String, unique: true },
  gdud: String,
  isManager: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
