const getProduct =  require("./handlers/getItem");
const getProducts = require("./handlers/getItems");
const getCompanies = require("./handlers/getCompanies");
const addToCart = require("./handlers/addToCart");


module.exports = {
  getProduct,
  getProducts,
  getCompanies,
  addToCart,
};