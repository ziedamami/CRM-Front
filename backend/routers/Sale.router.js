module.exports = function(app) {
    var sale = require('../controllers/Sale.Controller');

    app.post('/api/add_sale',sale.CreateSale);

    app.get('/api/all_sales',sale.FindAllSales);

    app.get('/api/seller_sales/:SellerModelId',sale.FindBySeller);








}