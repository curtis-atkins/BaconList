// Here is the O.R.M. where you write functions that takes inputs and conditions
// and turns them into database commands like SQL.
var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) {
  
  // column1=value, column2=value2,...
  var arr = [];
  for (var key in ob) {
    if (ob[key]) {
      arr.push(key + "=" + ob[key]);
    }
  }
  return arr.toString();
}

function getCols(inputObj) {
  var cols = [];
  for (key in inputObj) {
    cols.push(key);
  }
  return cols;
}

function getVals(inputObj) {
  var vals = [];
  for (key in inputObj) {
    vals.push(inputObj[key]);
  }
  return vals;
}

var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  
  // vals is an array of values that we want to save to cols
  // cols are the columns we want to insert the values into
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    //console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  
  // objColVals would be the columns and values that you want to update
  // an example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    //console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  upsert: function(table, objColVals, condition, cb) {
    var cols = getCols(objColVals);
    var vals = getVals(objColVals);
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += vals.toString();
    queryString += ") ";
    //console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += "user_balance = user_balance + " + objColVals['user_balance'];
        queryString += " WHERE ";
        queryString += condition;
        //console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          } else {
            cb(result);
          }
        });
      } else {
        cb(result);
      }
    });
  }
};

module.exports = orm;