var express = require("express");

var router = express.Router();
var bacon = require("../models/bacon");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/bacon");
});

router.get("/bacon", function(req, res) {
  // express callback response by calling bacon.selectAllBurger
  bacon.all(function(data) {
    // Wrapping the array of returned bacon in a object so it can be referenced inside our handlebars
    var hbsObject = { bacon: data };
    res.render("index", hbsObject);
  });
});

// post route -> back to index
router.post("/bacon/create", function(req, res) {
  // takes the request object using it as input for buger.addbacon
  bacon.create(req.body.item_name, function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/bacon/update", function(req, res) {
  bacon.update(req.body.bacon_id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

module.exports = router;
