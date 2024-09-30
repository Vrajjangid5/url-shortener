const express = require('express');
const router = express.Router();
const { generateUrl,getAnaly } = require('../controllers/generateUrl');

// Define the POST route
router.post('/', generateUrl);
router.get('/analytics/:shortId',getAnaly)

module.exports = router; // This exports the router
