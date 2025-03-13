const ProductModel = require("../models/products");

// Create a new product
const createProduct = async (req, res) => {
  const { name, price, productImage, description, avaliableQnty } = req.body;

  try {
    const product = await ProductModel.create({
      name,
      price,
      productImage,
      description,
      avaliableQnty,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { name, price, productImage, description, avaliableQnty } = req.body;

  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { name, price, productImage, description, avaliableQnty },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
