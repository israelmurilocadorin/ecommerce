const mongoose = require('mongoose');
const {
  ObjectId
} = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  },
  quality: {
    type: Number
  },
  sold: {
    type: Number,
    default: 0
  },
  smallImage: {
    data: Buffer,
    contentType: String
  },
  image: {
    data: Buffer,
    contentType: String
  },
  shipping: {
    required: false,
    type: Boolean
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", ProductSchema);
