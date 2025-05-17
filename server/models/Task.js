const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true }, // link task to user
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
