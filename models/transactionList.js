var orm = require("../config/orm");

var transactionList = {
  all: function(cb) {
    orm.all("transactionList", function(res) {
      cb(res);
    });
  },
  create: function(table, item_info, cb) {
    var col = [];
    var val = [];
    for (let key in item_info) {
      col.push(key);
      val.push(item_info[key]);
    }
    orm.create(table, col, val, cb);
  },
};

module.exports = transactionList;
