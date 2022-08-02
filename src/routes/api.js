const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const userController = require("../controllers/userController")

const { validate } = require('../validations/validation'); 
const { addCause } = require('../validations/validationAddCause');
const userValidation = require('../validations/userValidation');
const authMiddleware = require('../middlewares/authMiddleware');


// Home page route.
router.get('/', function (req, res) {
    res.send('Wiki home page');
});

// demo promise
router.get('/getJSON', courseController.getJSON);
router.get('/getJSONAsync', courseController.getJSONAsync);

router.post('/courses', validate(addCause), courseController.createCourse);
router.get('/courses', courseController.getAllCourse);
router.get('/courses/:courseId', courseController.getDetailCourse);
router.get('/courses/:courseId', courseController.getDetailCourse);
router.patch('/courses/:courseId', courseController.updateCourse);
router.delete('/courses/:courseId', courseController.deleteCourse);

router.post('/auth/register', [ userValidation.REGISTER ], userController.register)
router.post('/auth/login', [ userValidation.LOGIN ], userController.login)
router.use([ authMiddleware.isAuth ])
router.get('/users', userController.getUser )

module.exports = router;