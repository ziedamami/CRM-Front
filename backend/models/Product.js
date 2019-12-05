const mongoose = require('mongoose');
const ProductModel = mongoose.Schema({
  name: String,
  brand:String,
  price: Date,
  description:String
  
});
module.exports = mongoose.model('Product', ProductModel);