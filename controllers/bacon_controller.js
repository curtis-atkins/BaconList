var express = require("express");

var router = express.Router();
var bacon = require("../models/bacon");

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

router.get("/sell", function(req, res) {
  bacon.all(function(data) {
    var hbsObject = { bacon: data };
    res.render("sell", hbsObject);
  });
});

router.get("/buy", function(req, res) {
  bacon.all(function(data) {
    var hbsObject = { bacon: data };
    res.render("buy", hbsObject);
  });
});

router.get("/trade", function(req, res) {
  bacon.all(function(data) {
    var hbsObject = { bacon: data };
    res.render("trade", hbsObject);
  });
});

router.post("/bacon/create", function(req, res) {
  console.log(JSON.stringify(req.body));
  bacon.create(
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
  bacon.update(req.body.bacon_id, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

module.exports = router;
