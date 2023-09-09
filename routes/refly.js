const router = require("express").Router();
const reflyController = require("../controllers/refly_controller");

router.post("/write", reflyController.writeRefly);

module.exports = router;
