
let SellerModel = require('../models/Seller');


exports.CreateSeller= async(req, res) => {
    

    // Create a Seller
    const Seller = new SellerModel({
        firstName: req.body.firstName , 
        lastName: req.body.lastName ,
        username: req.body.username ,
        //password: req.body.password ,
        hiringDate:req.body.hiringDate
    });

    // Save Seller in the database
   constresult=await Seller.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the seller."
        });
    });
  };

  exports.FindAllSellers= (req, res) => {
    SellerModel.find()
        .then(doc => {
          res.json(doc)
        })
        .catch(err => {
          res.status(500).json(err)
        })
};

exports.findOneSeller = (req, res) => {
    SellerModel.findById(req.params.SellerModelId)
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "Seller not found with id " + req.params.SellerModelId
            });            
        }
        res.send(seller);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Seller not found with id " + req.params.SellerModelId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Seller with id " + req.params.SellerModelId
        });
    });
};

exports.updateSeller = (req, res) => {
    

    // Find Seller and update it with the request body
    SellerModel.findByIdAndUpdate(req.params.SellerModelId, {
        firstName: req.body.firstName , 
        lastName: req.body.lastName ,
        username: req.body.username ,
       // password: req.body.password ,
        hiringDate:req.body.hiringDate
    }, {new: true})
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "Seller not found with id " + req.params.SellerModelId
            });
        }
        res.send(seller);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Seller not found with id " + req.params.SellerModelId
            });                
        }
        return res.status(500).send({
            message: "Error updating seller with id " + req.params.SellerModelId
        });
    });
};

exports.deleteSeller = (req, res) => {
    SellerModel.findByIdAndRemove(req.params.SellerModelId)
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "Seller not found with id " + req.params.SellerModelId
            });
        }
        res.send({message: "Seller deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Seller not found with id " + req.params.SellerModelId
            });                
        }
        return res.status(500).send({
            message: "Could not delete seller with id " + req.params.SellerModelId
        });
    });
};