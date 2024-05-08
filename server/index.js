"use strict";

const express = require("express");
const morgan = require("morgan");

const getProduct = require("./handlers/getItem");
const getProducts = require("./handlers/getItems");

const getCompanies = require("./handlers/getCompanies");
const getCart = require("./handlers/getCart");

const addToCart = require("./handlers/addToCart");
const removeFromCart = require("./handlers/removeFromCart");
const checkoutCart = require("./handlers/checkoutCart");
express()
  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))

  //To catch all endpoints

  .get("/getProducts", getProducts)
  .get("/getProduct/:_id", getProduct)

  .get("/getCompanies", getCompanies)
  .get("/getCart", getCart)

  .post("/addToCart", addToCart)

  .delete("/removeFromCart", removeFromCart)

  .patch("/checkoutCart", checkoutCart)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
