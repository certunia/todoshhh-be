const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoListSchema = new Schema({
  list: {
    type: Array,
    required: false,
    default: []
  }
})

module.exports = mongoose.model('todoList', todoListSchema)
