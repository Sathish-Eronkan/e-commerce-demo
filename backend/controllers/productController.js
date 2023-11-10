import Product from "../models/productModel.js";

const getProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.log(err);
    }
}

const getProductById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
           res.json(product);
        }
        res.status(404).json({message: 'Product not found'});
    } catch (err) {
        console.log(err);
    }
}

export {getProducts, getProductById};