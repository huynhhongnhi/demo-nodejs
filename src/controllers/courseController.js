const courseService = require("../services/courseService");
const logger = require('../commons/logger');
const axios = require('axios');


const getJSON = () => {
    return new Promise( function(resolve) {
        axios.get('https://tutorialzine.com/misc/files/example.json')
            .then( function(json) {
                console.log("---------------Response-------------");
                console.log(json.data);
            }).catch((err) => { 
                console.log(err) 
            });
    });
}

const getJSONAsync = async () => {

    const url = "https://tutorialzine.com/misc/files/example.json";

    await axios.get(url).then(function(response) {
        console.log("---------------Response-------------");
        console.log(response.data);
    })
    .catch(function(error) {
        console.log(error)
    });
}


const getAllCourse = (req, res) => {
    courseService.getAllCourse().then((allCourse) => {

        // Log error
        // logger.error("Hello, Winston!");
        // logger.log("error", "Hello, Winston!");

        // Log debug
        // logger.log("debug", "Hello, Winston!");
        // logger.debug("The is the home '/' route.");

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
    deleteCourse,
    getJSON,
    getJSONAsync
};
  