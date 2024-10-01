const express = require("express");
const router = express.Router();
const URL = require("../models/url");

// Root route - Show all URLs for the logged-in user, or redirect to login if not authenticated
router.get('/', async (req, res) => {
    if (!req.user) {
        return res.render("home", {
            urls: [], // No URLs for unauthenticated users
        });
    }

    try {
        const allUrl = await URL.find({ createdBy: req.user._id });
        return res.render("home", {
            urls: allUrl,
        });
    } catch (err) {
        console.error("Error fetching URLs:", err);
        res.status(500).send("Failed to load URLs.");
    }
});

// Signup route
router.get("/signup", (req, res) => {
    return res.render("signUp");
});

// Login route
router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
