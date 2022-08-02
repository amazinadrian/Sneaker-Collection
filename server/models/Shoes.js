const mongoose = require('mongoose');

const shoesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  brand: {
    type: String,
    enum: ['Nike', 'Adidas', 'Air Jordan', 'Yeezy', 'Converse'],
    
  },
  price: {
    type: String,
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  }
});

module.exports = mongoose.model('Shoes', shoesSchema);