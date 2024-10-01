const express = require("express");
const router = express.Router();
const {handleSignUp} = require("../controllers/user");

router.post('/',handleSignUp);


module.exports =router;