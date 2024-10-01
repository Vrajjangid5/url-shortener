const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const { connectDB } = require('./connect');
const cookieParser = require('cookie-parser');
const URL= require("./models/url");
const staticRouter = require("./routes/staticRoute");
const urlRouter = require('./routes/url');
const userRoute = require('./routes/user');
const { userAuth, checkAuth } = require("./middlewares/auth");

// Connect to the MongoDB database
connectDB('mongodb://localhost:27017/short-url')
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("Failed to connect to DB", err)); // Handle connection errors

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.use('/url', userAuth, urlRouter);
app.use('/user', userRoute);
app.use("/",checkAuth, staticRouter);

app.get('/:shortId', async (req, res) => {
    const ShortId = req.params.shortId;
    
    try {
        // Find the URL entry based on the shortId
        const entry = await URL.findOne({ shortId: ShortId });

        // If no entry is found, send a 404 response
        if (!entry) {
            return res.status(404).send("Short URL not found.");
        }

        // If found, update visit history and redirect to the original URL
        await URL.updateOne(
            { shortId: ShortId },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );

        // Redirect to the original URL
        res.redirect(entry.redirectUrl);
        
    } catch (error) {
        console.error("Error during URL redirection:", error.message);
        res.status(500).send("Error during redirection.");
    }
});


// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
