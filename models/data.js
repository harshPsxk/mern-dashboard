const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  deviceId: String,
  companyId: String,
  temperature: Number,
  date: Date, // Adding date as a Date object
}, { versionKey: false });

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
