const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/../views/login/index.html'));
});

module.exports = router;