const router = require("express").Router();
const reflyController = require("../controllers/refly_controller");

router.post("/write", reflyController.writeRefly);

router.post("/reflyPasswordCheck/:id", reflyController.reflyPasswordCheck);

router.get("/delete/:id", reflyController.deleteRefly);

module.exports = router;
