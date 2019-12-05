let SaleModel = require('../models/Sale');
let SellerModel = require('../models/Seller');
let ProductModel = require('../models/Product');

exports.FindAllSales= (req, res) => {
    SaleModel.find()
        .then(doc => {
          res.json(doc)
        })
        .catch(err => {
          res.status(500).json(err)
        })
};

exports.CreateSale= async(req, res) => {
    

    // Create a Sale
    const Sale = new SaleModel({
        dateOfSale: new Date() , 
        seller: req.body.seller ,
        products: req.body.products ,
        amount: req.body.amount
    });

    // Save Sale in the database
   const result=await Sale.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the seller."
        });
    });
  };

  exports.FindBySeller= (req, res) => {
    SaleModel.find({ seller : req.params.SellerModelId })
  .exec(function (err, sales) {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Sales not found with given seller Id " + req.params.SellerModelId
        });                
      }
      return res.status(500).send({
        message: "Error retrieving sales with given seller Id " + req.params.SellerModelId
      });
    }
          
    res.send(sales);
  });
};

