var orm = require("../config/orm");

var bacon = {
  all: function(cb) {
    orm.all("itemList", function(res) {
      cb(res);
    });
  },
  create: function(name, cb) {
    orm.create("itemList", ["item_name", "sold"], [name, false], cb);
  },
  update: function(id, cb) {
    var condition = "id=" + id;
    orm.update("itemList", {
      sold: true
    }, condition, cb);
  }
};

module.exports = bacon;
