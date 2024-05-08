const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const getProduct = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const { _id } = req.params;
    const db = client.db("ecommerce");
    console.log("Connected");
    const query = { _id: Number(_id) };
    const foundProduct = await db.collection("items").findOne(query);
    if (!foundProduct) {
      res.status(404).json({
        status: 404,
        message: `Unable to find a product with id: ${_id}.`,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: foundProduct,
        message: "Found product!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 404,
      message: "Unable to find the product you were looking for!",
    });
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

module.exports = getProduct;
