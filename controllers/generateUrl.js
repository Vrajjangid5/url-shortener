const shortid = require('shortid');
const URL = require('../models/url');

async function generateUrl(req, res) {
    try {
        const body = req.body;
        if (!body.url) return res.status(400).send("URL is required");

        // Generate a short ID for the URL
        const shortId = shortid.generate();

        // Create a new URL document in the database
        const newUrl = await URL.create({
            shortId: shortId,
            redirectUrl: body.url,
            visitHistory: [],
            createdBy:req.user._id,
        });
        return res.render("home",{
            id:shortId,
        });
        // Respond with the generated shortId
       // return res.send({ id: shortId });
    } catch (error) {
        // Handle potential errors
        console.error("Error creating URL:", error);
        return res.status(500).send("Internal Server Error");
    }
}
async function getAnaly(req, res) {
    try {
        const shortId = req.params.shortId; // Ensure this matches the field in the model
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        return res.json({
            totalClicks: result.visitHistory.length, // Provide total clicks count
            analytics: result.visitHistory, // Return visit history as analytics
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = { generateUrl,getAnaly };
