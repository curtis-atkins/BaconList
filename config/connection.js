var mysql = require("mysql");


/*var connection = mysql.createConnection({
    host: "p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "cecm0l9b35qd2mv0",
    password: "k3bzmvgljxgpkkx0",
    database: "lof3wyne7luqrirs"
});*/



var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "bacon_db"
});


connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;
