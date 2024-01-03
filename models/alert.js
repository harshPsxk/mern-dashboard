// models/alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  deviceId: String,
  condition: String,
  threshold: Number,
  companyId: String // assuming alerts are specific to a company
});

module.exports = mongoose.model('Alert', alertSchema);
