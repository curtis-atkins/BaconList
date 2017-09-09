var orm = require("../config/orm");

var bacon = {
  all: function(cb) {
    orm.all("itemList", function(res) {
      cb(res);
    });
  },
  create: function(item_info, cb) {
    var col = [];
    var val = [];
    for (let key in item_info) {
      col.push(key);
      val.push(item_info[key]);
    }
    orm.create("itemList", col, val, cb);
  },
  update: function(id, cb) {
    var condition = "item_id=" + id;
    orm.update("itemList", {
      sold: true
    }, condition, cb);
  }
};

module.exports = bacon;
