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

/*
router.get("/trade", function(req, res) {
  bacon.all(function(data) {
    var hbsObject = { bacon: data };
    res.render("trade", hbsObject);
  });
});
*/

router.post("/bacon/create", function(req, res) {
  console.log(JSON.stringify(req.body));
  bacon.create("itemList",
    {
      item_name: req.body.item_name,
      item_price: req.body.item_price,
      item_description: req.body.item_description,
      item_image: req.body.item_image
    }, function(result) {
    console.log(result);
    res.redirect("/sell");
  });
});

router.put("/bacon/update", function(req, res) {
  const item_id = req.body.bacon_id;
  bacon.update("itemList", item_id, function(result) {
    console.log(result);
    //Creates transaction log
    transactionList.create("transactionList",
      {
        item_id: item_id,
        item_price: 10.00,
        buyer_id: 0,
        seller_id: 0
      }, function(result) {
        console.log(result);
        res.redirect("/bacon");
    });
  });
});

//Updates User tester
router.get("/upsertUser", function(req, res) {
  console.log('Something went wrong here.rs')
  userList.upsert('userList',
    {
      user_id: 12345,
      user_balance: 25
    }, function(result) {
    console.log(result);
    res.redirect("/bacon");
  });
});

module.exports = router;
