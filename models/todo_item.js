const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoItemSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('todoItem', todoItemSchema)
