const { body } = require('express-validator');

const addCause = [
    body('title').exists().withMessage('Title is not empty'),
    body('description').exists().withMessage('Description is not empty')
];

module.exports = { addCause }