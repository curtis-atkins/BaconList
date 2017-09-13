var request = require("request");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,

  // Your username
  user: "cecm0l9b35qd2mv0",

  // Your password
  password: "k3bzmvgljxgpkkx0",
  database: "lof3wyne7luqrirs"
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
            console.log(items[i].galleryURL[0]);
            var itemImage = "";
            if (items[i].galleryURL[0] === "http://thumbs1.ebaystatic.com/pict/04040_0.jpg") {
                itemImage = "../assets/images/baconMan.png";
            }
            else {
                itemImage = items[i].galleryURL[0];
            }
            var query = connection.query(
            "INSERT INTO itemList SET ?",
            {
                item_name: items[i].title,
                item_price: items[i].sellingStatus[0].currentPrice[0].__value__,
                item_image: itemImage
            },
            function(err, res) {
                console.log(res.affectedRows + "product inserted!\n"); 
            }
            );
        }
  }
  connection.end();
});