const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const checkoutCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { inCart } = req.body;
  const idsToUpdate = [];
  const itemQuantity = [];
  const updates = [];
  try {
    await client.connect();
    const db = client.db("ecommerce");

    inCart.map((cartItem) => {
      let id = Number(cartItem._id);
      let quantity = Number(cartItem.quantity);
      idsToUpdate.push(id);
      itemQuantity.push(quantity);
    });
    let products = await db
      .collection("items")
      .find({ _id: { $in: idsToUpdate } })
      .toArray();
    inCart.map((cartItem) => {
      let id = Number(cartItem._id);
      let quantityOrdered = Number(cartItem.quantity);
      products.map((product) => {
        if (product._id === id) {
          let updatedStock = product.numInStock - quantityOrdered;
          updates.push({
            filter: { _id: id },
            update: { $set: { numInStock: updatedStock } },
          });
        }
      });
    });
    async function updateItems(updates) {
      for (const update of updates) {
        try {
          const response = await db
            .collection("items")
            .updateMany(update.filter, update.update);
          console.log(response, "Item updated successfully");
        } catch (error) {
          console.error("Error occurred while updating item:", error);
        }
      }
    }
    await updateItems(updates);

    await db.collection("cart").deleteMany({});
    res.status(200).json({
      status: 200,
      message: "Items deleted from cart and and updated in items",
    });
  } catch (err) {
    console.error("Error in checkoutCart:", err.stack);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};

module.exports = checkoutCart;
