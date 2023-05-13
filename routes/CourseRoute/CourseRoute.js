const router = require("express").Router();
const courseController = require("../../controller/courseController");


router.post("/add", courseController.add);
router.post("/update", courseController.update);
router.get("/list", courseController.getList);
router.get("/details/:id", courseController.getDetails);
router.delete("/delete/:id", courseController.delete);

module.exports = router;