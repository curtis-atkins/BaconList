var request = require("request");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bacon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

request("https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=BaharRos-Baconx27-PRD-eb7edec1b-14ac140f&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=bacon&paginationInput.entriesPerPage=50&GLOBAL-ID=EBAY-US&siteid=0", function (error, response, body) {

  if (!error && response.statusCode === 200) {
        console.log("response" + body);
        var items = JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0].item;
        for (var i = 0; i < items.length; i++) {
            console.log("Inserting a new product...\n");
            var query = connection.query(
            "INSERT INTO itemList SET ?",
            {
                item_name: items[i].title,
                item_price: items[i].sellingStatus[0].currentPrice[0].__value__
            },
            function(err, res) {
                console.log(res.affectedRows + " product inserted!\n"); 
            }
            );
        }
  }
});