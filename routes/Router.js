const router = require("express").Router();
const CourseRoute = require("./CourseRoute/CourseRoute");


router.use("/course", CourseRoute);;

module.exports = router;
