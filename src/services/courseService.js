const Course = require('../models/course');
const mongoose = require('mongoose');
const db = require('../configs/db')

const getAllCourse = () => {
    const courses = Course.find().select(`_id title description`);
    return courses;
};

const getDetailCourse = (id) => {
    const course = Course.findById(id);
    return course;
};

const createCourse = (params) => {
    try {
        params._id = mongoose.Types.ObjectId();
        const course = Course(params);
        const createCourse = course.save();
        return createCourse;
    } catch (error) {
        throw error;
    }
};

const updateCourse = (id, params) => {
    try {
        const course = Course.updateOne({ _id: id }, { $set:params });
        return course;
    } catch (error) {
        throw error;
    }
};

const deleteCourse = (id) => {
    try {
        const course = Course.deleteOne({_id: id});
        return course;
    } catch (error) {
        throw error;
    }
};
  
module.exports = {
    getAllCourse,
    getDetailCourse,
    createCourse,
    updateCourse,
    deleteCourse,
};