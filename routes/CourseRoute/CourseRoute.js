const router = require("express").Router();
const courseController = require("../../controller/courseController");


router.post("/add", courseController.add);
router.get("/list", courseController.getList);

module.exports = router;