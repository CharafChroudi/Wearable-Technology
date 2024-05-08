const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// returns an array of all companies
const getCompanies = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("ecommerce");
    const whatCompany = req.params._id;
    const companyFound = await db.collection("companies").findOne({ _id: Number(whatCompany)});

    if (!companyFound) {
        res.status(404).json({
          status: 404,
          message: `Unable to find a company with id: ${whatCompany}.`,
        });
      } else {
        res.status(200).json({
          status: 200,
          data: companyFound,
          message: "Found company!",
        });
      }
  } catch (err) {
    res.status(502).json({ status: 502, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = getCompanies;
