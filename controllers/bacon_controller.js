var express = require("express");

var router = express.Router();
var bacon = require("../models/bacon");
var userList = require("../models/userList");
var transactionList = require("../models/transactionList");

router.get("/login", function(req, res) {
  bacon.all(function(data) {
    var hbsObject = { bacon: data };
    res.render("login", hbsObject);
  });
});

router.get("/", function(req, res) {
  res.redirect("/login");
});

router.get("/bacon", function(req, res) {
  bacon.all(function(data) {
    var hbsObject = { bacon: data };
    res.render("index", hbsObject);
  });
});

router.get("/buy", function(req, res) {
  bacon.all(function(data) {
    var hbsObject = { bacon: data };
    res.render("index", hbsObject);
  });
});

router.get("/sell", function(req, res) {
  bacon.all(function(data) {
    var hbsObject = { bacon: data };
    res.render("sell", hbsObject);
  });
});

router.post("/bacon/create", function(req, res) {
  //console.log(JSON.stringify(req.body));
  bacon.create("itemList",
    {
      item_name: req.body.item_name,
      item_price: req.body.item_price,
      item_description: req.body.item_description,
      item_image: req.body.item_image
    }, function(result) {
    //console.log(result);
    res.redirect("/sell");
  });
});

router.put("/bacon/update", function(req, res) {
  const item_id = req.body.bacon_id;
  const item_price = req.body.bacon_price;
  const buyer_id = req.body.bacon_user;
  const seller_id = req.body.bacon_seller;
  bacon.update("itemList", item_id, function(result) {
    //console.log(result);
    //Creates transaction log
    transactionList.create("transactionList",
    {
      item_id: item_id,
      item_price: item_price,
      buyer_id: buyer_id,
      seller_id: seller_id
    }, function(result) {
      //console.log(result);
      userList.upsert('userList',
      {
        user_id: buyer_id,
        user_balance: item_price
      }, function(result) {
        //console.log(result);
        res.redirect("/bacon");
      });
    });
  });
});

module.exports = router;
