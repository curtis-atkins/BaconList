var orm = require("../config/orm");

var userList = {
  all: function(cb) {
    orm.all("itemList", function(res) {
      cb(res);
    });
  },
  upsert: function(table, item_info, cb) {
    var condition = 'user_id = '+ item_info.user_id;
    orm.upsert(table, item_info, condition, cb);
  }
};

module.exports = userList;
