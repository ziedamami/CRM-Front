const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// create express app
const app = express();

var cors = require('cors')
app.use(cors())


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
  }));
// parse requests of content-type - application/json
app.use(bodyParser.json())
// Configuring the database
const dbConfig = require('./backend/config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


require('./backend/routers/Seller.router')(app);
require('./backend/routers/Sale.router')(app);

app.use(express.static(__dirname + '/src'));

app.get('/', function(req,res) {
    
res.sendFile(path.join(__dirname+'/src/index.html'));
});

const Authroute= require ('./backend/auth/auth');
app.use(Authroute); 

// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});