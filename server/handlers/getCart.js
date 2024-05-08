const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// returns an array of all companies
const getCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("ecommerce");
    const cartItemsFound = await db.collection("cart").find({}).toArray();

    if (!cartItemsFound) {
        res.status(404).json({
          status: 404,
          message: "The cart is empty!",
        });
      } else {
        res.status(200).json({
          status: 200,
          data: cartItemsFound,
          message: "There are items in the cart.",
        });
      }
  } catch (err) {
    res.status(502).json({ status: 502, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = getCart;