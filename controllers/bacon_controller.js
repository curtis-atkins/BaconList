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

//Creates User
//Needs to upate .get to .post
router.get("/createUser", function(req, res) {
  console.log(JSON.stringify(req.body));
  userList.create("userList",
    {
      user_firstName: "Dummy",
      user_lastName: "01",
      user_userName: "dummy01@somewhere.com"
    }, function(result) {
    console.log(result);
    res.redirect("/bacon");
  });
});

/*
//Logs Transaction history
router.put("/createTransaction", function(req, res) {
  transactionList.create("transactionList",
    {
      item_id: req.body.bacon_id,
      item_price: 10.00,
      buyer_id: 1,
      seller_id: 0
    }, function(result) {
      console.log(result);
      res.redirect("/index");
  });
});
*/

//Updates User
router.put("/updateUser", function(req, res) {
  bacon.update("userList", "jeremyhe1@gmail.com", 1234, function(result) {
    console.log(result);
    res.redirect("/bacon");
  });
});

module.exports = router;
