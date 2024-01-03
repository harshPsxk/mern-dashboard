const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  scopes: Array,
  companyId: String
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
