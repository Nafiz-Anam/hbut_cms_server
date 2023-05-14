require("dotenv").config();
const CourseModel = require("../model/courseModel");

var CourseController = {
    getList: async (req, res) => {
        try {
            let filter = {};
            if (req.bodyString("course_type")) {
                filter.course_type = req.bodyString("course_type");
            }
            if (req.bodyString("course_name")) {
                filter.name = req.bodyString("course_name");
            }
            if (req.bodyString("course_teacher")) {
                filter.teacher = req.bodyString("course_teacher");
            }

            CourseModel.select_list(filter)
                .then(async (result) => {
                    let response = [];
                    for (val of result) {
                        temp = {
                            id: val.id ? "#" + val.id : "",
                            course_name: val?.name ? val?.name : "",
                            course_type: val?.course_type
                                ? val?.course_type
                                : "",
                            course_credits: val?.credit ? val?.credit : "",
                            course_duration: val?.class_hour
                                ? val?.class_hour
                                : "",
                            course_teacher: val?.teacher ? val?.teacher : "",
                        };
                        response.push(temp);
                    }
                    res.status(200).json({
                        status: true,
                        data: response,
                        message: "Courses fetched successfully!",
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        data: {},
                        error: "Server side error!",
                    });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                data: {},
                error: "Server side error!",
            });
        }
    },

    getDetails: async (req, res) => {
        try {
            let id = req.params.id;

            CourseModel.select({ id: id })
                .then(async (result) => {
                    let response = [];
                    for (val of result) {
                        temp = {
                            id: val.id ? "#" + val.id : "",
                            course_name: val?.name ? val?.name : "",
                            course_type: val?.course_type
                                ? val?.course_type
                                : "",
                            course_credits: val?.credit ? val?.credit : "",
                            course_duration: val?.class_hour
                                ? val?.class_hour
                                : "",
                            course_teacher: val?.teacher ? val?.teacher : "",
                        };
                        response.push(temp);
                    }
                    res.status(200).json({
                        status: true,
                        data: response,
                        message: "Course details fetched successfully!",
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        data: {},
                        error: "Server side error!",
                    });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                data: {},
                error: "Server side error!",
            });
        }
    },

    delete: async (req, res) => {
        try {
            let id = req.params.id;
            CourseModel.delete({ id: id })
                .then(async (result) => {
                    res.status(200).json({
                        status: true,
                        message: "Course deleted successfully!",
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        data: {},
                        error: "Server side error!",
                    });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                data: {},
                error: "Server side error!",
            });
        }
    },

    add: async (req, res) => {
        try {
            let courseInfo = {};

            if (req.bodyString("course_teacher")) {
                courseInfo.teacher = req.bodyString("course_teacher");
            }
            if (req.bodyString("course_duration")) {
                courseInfo.class_hour = req.bodyString("course_duration");
            }
            if (req.bodyString("course_credits")) {
                courseInfo.credit = req.bodyString("course_credits");
            }
            if (req.bodyString("course_type")) {
                courseInfo.course_type = req.bodyString("course_type");
            }
            if (req.bodyString("course_name")) {
                courseInfo.name = req.bodyString("course_name");
            }

            console.log("courseInfo", courseInfo);

            await CourseModel.add(courseInfo)
                .then((response) => {
                    res.status(200).json({
                        status: true,
                        message: "Course added successfully",
                    });
                })
                .catch((err) => {
                    console.log("err", err);
                    res.status(500).json({
                        status: false,
                        error: "Server side error!",
                    });
                });
        } catch (error) {
            console.log("error", error);
            res.status(500).json({
                status: false,
                error: "Server side error!",
            });
        }
    },

    update: async (req, res) => {
        try {
            let id = req.body.billID;
            let courseInfo = {};

            if (req.bodyString("course_teacher")) {
                courseInfo.teacher = req.bodyString("course_teacher");
            }
            if (req.bodyString("course_duration")) {
                courseInfo.class_hour = req.bodyString("course_duration");
            }
            if (req.bodyString("course_credits")) {
                courseInfo.credit = req.bodyString("course_credits");
            }
            if (req.bodyString("course_type")) {
                courseInfo.course_type = req.bodyString("course_type");
            }
            if (req.bodyString("course_name")) {
                courseInfo.name = req.bodyString("course_name");
            }
            console.log("courseInfo", courseInfo);

            await CourseModel.update({ id: id }, courseInfo)
                .then((response) => {
                    res.status(200).json({
                        status: true,
                        message: "Course updated successfully",
                    });
                })
                .catch((err) => {
                    console.log("err", err);
                    res.status(500).json({
                        status: false,
                        error: "Server side error!",
                    });
                });
        } catch (error) {
            console.log("error", error);
            res.status(500).json({
                status: false,
                error: "Server side error!",
            });
        }
    },
};

module.exports = CourseController;
