var request = require("request");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Hypeman28!!",
  database: "bacon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // createProduct();
  });

request("https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=BaharRos-Baconx27-PRD-eb7edec1b-14ac140f&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=bacon&paginationInput.entriesPerPage=1&GLOBAL-ID=EBAY-US&siteid=0", function(error, response, body) {



  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("response" + body);

    // function createProduct() {
    console.log("response" + body);
        var items = body.findItemsByKeywordsResponse[0]/*.searchResult[1]*/;
        for (var i = 0; i < items.length; i++) {
            console.log("Inserting a new product...\n");
            var query = connection.query(
            "INSERT INTO itemList SET ?",
            { // this creates the columns in the database
                item_name: items[i].title,
                item_price: items[i].sellingStatus[0].currentPrice[0].__value__
            },
            function(err, res) {
                console.log(res.affectedRows + " product inserted!\n"); // affectedRows is a number
                // Call updateProduct AFTER the INSERT completes
                // updateProduct();
            }
            );
        }
//   }
    }
});