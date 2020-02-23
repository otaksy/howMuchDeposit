var express = require("express");
var router = express.Router();
const HowMuchDeposit = require("./v1/howMuchDeposit");

/* POST howMuchDeposit */
router.post("/api/v1/howMuchDeposit", function(req, res, next) {
  try {
    const context = {};
    context.req = req;
    context.res = res;
    const howMuchDeposit = new HowMuchDeposit();
    howMuchDeposit.initialize(context);
    howMuchDeposit.validate(context);
    howMuchDeposit.process(context);
    howMuchDeposit.finalize(context);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
