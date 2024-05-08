const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const addToCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { _id, name, price, imageSrc, quantity } = req.body;
  const id = Number(_id);
  try {
    await client.connect();
    const db = client.db("ecommerce");

    // Does item exists?
    const item = await db.collection("items").findOne({ _id: id });
    const itemInCart = await db.collection("cart").findOne({ _id: id });
    const itemToAdd = {
      _id: id,
      name: name,
      price: price,
      imageSrc: imageSrc,
      quantity: Number(quantity),
    };

    if (itemInCart) {
      return res
        .status(400)
        .json({ status: 400, error: "Item already in Cart" });
    }

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // is there enough item available?
    if (item.quantity < quantity) {
      return res.status(400).json({ error: "Not enough items available" });
    }

    // add item to the cart
    await db.collection("cart").insertOne(itemToAdd);

    res.status(201).json({ status: 201, message: "Item added to cart" });
  } catch (err) {
    console.error("Error in addToCart:", err.stack);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};

module.exports = addToCart;
