const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  image: String,
  materials: String,
  dimensions: String,
  artisan: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
