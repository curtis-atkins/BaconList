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
  res.redirect("/bacon");
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
  bacon.update("itemList", req.body.bacon_id, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

//Creates User
router.post("/bacon/createUser", function(req, res) {
  console.log(JSON.stringify(req.body));
  userList.create("userList",
    {
      user_firstName: "Jeremy",
      user_lastName: "He",
      user_userName: "jeremyhe1@gmail.com"
    }, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

//Updates User
router.put("/bacon/updateUser", function(req, res) {
  bacon.update("userList", "jeremyhe1@gmail.com", 1234, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

//Logs Transaction history
router.post("/bacon/createTransaction", function(req, res) {
  console.log(JSON.stringify(req.body));
  transactionList.create("transactionList",
    {
      item_id: req.body.item_id,
      item_price: req.body.item_price,
      buyer_id: "Someone",
      seller_id: "BaconList"
    }, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

module.exports = router;
