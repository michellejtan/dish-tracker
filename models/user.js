const mongoose = require('mongoose');

// Define the Dish schema
const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  restaurantName: {
    type: String,
    required: true
  },
  restaurantLocation: {
    type: String
  },
  comments: {
    type: [String],
    default: []
  },  // Array of comments
  status: {
    type: String,
    enum: ['Tried', 'Want to Try'],
    default: 'Want to Try'
  },
  websiteLink: {
    type: String
  },
},
  {
    timestamps: true
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: { type: String },
  password: {
    type: String,
    required: true,
  },
  dishes: [dishSchema]  // Embedded dishes array
});

const User = mongoose.model('User', userSchema);

module.exports = User;