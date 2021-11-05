const express = require("express");
const mongoose = require("mongoose");
const shortid= require("shortid");
const bodyParser = require("body-parser");
//run express as a function and set result inside app variable
const app = express();
app.use(bodyParser.json());

//run database with URL and varibles to make connection easiers
mongoose.connect("mongodb://localhost/react-shopping-cart-db",{
useNewUrlParser: true,
});

//model = makes model with name of collection and list of fields of model into database
const Product = mongoose.model("products", 

new mongoose.Schema({
    _id: {type: String, default: shortid.generate }, //when you create a new product it generates an id for it
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],


}));

app.get("/api/products",async(req, res) => {
    //define product model

    //get list of products from database empty parameter, there is no conditions 
    const products = await Product.find({});

    //send back to client
    res.send(products);

});

//endpoint to create product fills req.body with data from new product
app.post("api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});



/*Deleting items */
app.delete("/api/products/:id", async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});



//listen to port and launch sserver

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));


