var orm = require("../config/orm");

var userList = {
  all: function(cb) {
    orm.all("itemList", function(res) {
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
  update: function(table ,id, newBalance, cb) {
    var condition = "user_id=" + id;
    orm.update(table, {
      user_balance: newBalance
    }, condition, cb);
  }
};

module.exports = userList;
