var express = require("express");

var router = express.Router();
var bacon = require("../models/bacon");

router.get("/", function(req, res) {
  res.redirect("/bacon");
});

router.get("/bacon", function(req, res) {
  bacon.all(function(data) {
    var hbsObject = { bacon: data };
    res.render("index", hbsObject);
  });
});

router.post("/bacon/create", function(req, res) {
  bacon.create(req.body.item_name, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

router.put("/bacon/update", function(req, res) {
  bacon.update(req.body.bacon_id, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

module.exports = router;
