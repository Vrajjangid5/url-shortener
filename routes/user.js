const express = require("express");
const router = express.Router();
const { handleSignUp, handleLogin } = require("../controllers/user");

// Route for sign-up
router.post('/', handleSignUp);

// Route for login
router.post('/login', handleLogin);

module.exports = router;
