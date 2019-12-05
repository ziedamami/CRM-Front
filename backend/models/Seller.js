const mongoose = require('mongoose');
const SellerModel = mongoose.Schema({
  firstName: String,
  lastName:String,
  username:String,
  password:String,
  hiringDate: Date,
  sales:[ { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sale' 
  }]
});
module.exports = mongoose.model('Seller', SellerModel);