const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = Product.findAll();
  try {
    const allProducts = await products;
    res.json(allProducts);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const product = Product.create({
    title: req.body.title,
    price: req.body.price,
    imageUrl: "imageurl",
    description: req.body.description,
  });
  try {
    const savedProduct = await product;
    res.json(savedProduct);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
