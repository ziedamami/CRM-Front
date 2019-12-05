module.exports = function(app) {
    var seller = require('../controllers/Seller.Controller');

    app.post('/api/add_seller',seller.CreateSeller);

    app.get('/api/all_sellers',seller.FindAllSellers);

    app.get('/api/seller/:SellerModelId',seller.findOneSeller);

    app.put('/api/update_seller/:SellerModelId',seller.updateSeller);

    app.delete('/api/delete_seller/:SellerModelId',seller.deleteSeller);





}
