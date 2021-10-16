const Product = require("../models/product");

exports.updateStock = async function (id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save();
};
