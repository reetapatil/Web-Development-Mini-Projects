const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const productRoutes = express.Router();
let Product = require('./data');

var dbUrl = 'mongodb+srv://reeta:*****@nodeproject-yxnmk.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Mongo DB connection");
    }

});

// Create Product
productRoutes.route('/create').post(function (req, res) {
    let newProduct = new Product(req.body);
    newProduct.save()
        .then(newProduct => {
            res.status(200).json({ 'Message': 'New Product added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
});

// Read Products
productRoutes.route('/get').get(function (req, res) {
    Product.find(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

// Update Product
productRoutes.route('/update').post(function (req, res) {
    // The Url is not as /update/:id because the id is already present in req.body, therefore haven't taken the id as parameter.
    
    let updateProduct = new Product(req.body);
    var myquery = { id: updateProduct.id };
    Product.updateOne(myquery, updateProduct, (err, delData) => {
        res.json('Product updated!');
    })

});

// Delete Product 
productRoutes.route('/delete/:id').get(function (req, res) {
    let id = req.params.id;
    var myquery = { id: req.params.id };
    Product.deleteOne(myquery, function (err, obj) {
        res.json('Msg from server: DELETED');
    });

});

app.use('/product', productRoutes);
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
