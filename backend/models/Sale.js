const mongoose = require('mongoose');
const SaleModel = mongoose.Schema({
  
  dateOfSale: { 
    type: Date, 
  },

  seller:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Seller' 
  },
  products:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' 
  },
  amount:Number

});
module.exports = mongoose.model('Sale', SaleModel);