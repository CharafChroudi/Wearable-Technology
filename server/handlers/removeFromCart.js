const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const removeFromCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { _id } = req.body;
  const id = Number(_id);
  try {
    await client.connect();
    const db = client.db("ecommerce");

    // Does item exists?
    const itemInCart = await db.collection("cart").findOne({ _id: id });
    if (!itemInCart) {
      return res
        .status(400)
        .json({ status: 400, error: "This item is not in your cart!" });
    }
    // add item to the cart
    await db.collection("cart").deleteOne(itemInCart);

    res.status(200).json({ status: 200, message: "Item deleted from cart" });
  } catch (err) {
    console.error("Error in removeFromCart:", err.stack);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};

module.exports = removeFromCart;
