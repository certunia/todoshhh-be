const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    default: false
  },
  firstName: {
    type: String,
    default: false
  },
  lastName: {
    type: String,
    default: false
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  todoLists: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('User', UserSchema)
