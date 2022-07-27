const User = require('../models/user');
const mongoose = require('mongoose');
const db = require('../configs/db')

const createUser = (params) => {
    try {        
        params._id = mongoose.Types.ObjectId();
        const user = User(params);
        const createUser = user.save();
        return createUser;
    } catch (error) {
        throw error;
    }
};

const getFindUser = (param) => {
    const course = User.findOne(param);
    return course;
};
  
module.exports = {
    createUser,
    getFindUser
};