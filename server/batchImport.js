const { MongoClient } = require("mongodb");

const companies = require("./data/companies.json");
const items = require("./data/items.json");

require("dotenv").config();
const { MONGO_URI } = process.env;

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("ecommerce");
    // await db.collection("companies").insertMany(companies);
    await db.collection("items").insertMany(items);
    console.log("all of the items and companies were added succesfully!");
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

batchImport();
