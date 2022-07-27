const express = require('express');
const router = express.Router();

const Course = require('../controllers/courseController');
const userController = require("../controllers/userController")

const { validate } = require('../validations/validation'); 
const { addCause } = require('../validations/validationAddCause');
const userValidation = require('../validations/userValidation');
const authMiddleware = require('../middlewares/authMiddleware');


// Home page route.
router.get('/', function (req, res) {
    res.send('Wiki home page');
});

router.post('/courses', validate(addCause), Course.createCourse);
router.get('/courses', Course.getAllCourse);
router.get('/courses/:courseId', Course.getDetailCourse);
router.get('/courses/:courseId', Course.getDetailCourse);
router.patch('/courses/:courseId', Course.updateCourse);
router.delete('/courses/:courseId', Course.deleteCourse);

router.post('/auth/register', [ userValidation.REGISTER ], userController.register)
router.post('/auth/login', [ userValidation.LOGIN ], userController.login)

router.use([ authMiddleware.isAuth ])

router.get('/users', userController.getUser )

module.exports = router;