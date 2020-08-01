const user = require("./user");

module.exports = function (app) {
  return user(app);
};
