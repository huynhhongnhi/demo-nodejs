const courseService = require("../services/courseService");

const getAllCourse = (req, res) => {
    courseService.getAllCourse().then((allCourse) => {
        return res.status(200).json({
            success: true,
            data: allCourse,
        });
    }).catch((err) => {
        return res.status(500).json({
            success: 500,
            error: err.message
        });
    })
};

const getDetailCourse = (req, res) => {
    const id = req.params.courseId;
    courseService.getDetailCourse(id).then((singleCourse) => {
        return res.status(200).json({
            success: true,
            data: singleCourse,
        });
    }).catch((err) => {
        return res.status(500).json({
            success: 500,
            error: err.message
        });
    })
};

const createCourse = (req, res) => {
    $params = {
        "title": req.body.title,
        "description": req.body.description,
    }
    courseService.createCourse($params).then((newCourse) => {
        return res.status(200).json({
            success: true,
            data: newCourse,
        });
    }).catch((err) => {
        return res.status(500).json({
            success: 500,
            error: err.message
        });
    });
};

const updateCourse = (req, res) => {
    const id = req.params.courseId;
    const params = req.body;
    courseService.updateCourse(id, params).then((newCourse) => {
        return res.status(200).json({
            success: true
        });
    }).catch((err) => {
        return res.status(500).json({
            success: 500,
            error: err.message
        });
    });
};

const deleteCourse = (req, res) => {
    const id = req.params.courseId;
    courseService.deleteCourse(id).then((newCourse) => {
        return res.status(200).json({
            success: true
        });
    }).catch((err) => {
        return res.status(500).json({
            success: 500,
            error: err.message
        });
    });
};

module.exports = {
    getAllCourse,
    getDetailCourse,
    createCourse,
    updateCourse,
    deleteCourse
};
  