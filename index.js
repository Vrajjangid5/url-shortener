const express = require('express');
const app = express(); // Lowercase 'app' for consistency
const PORT = 3000;
const path = require('path');
const { connectDB } = require('./connect');
const URL = require('./models/url');
const staticRouter = require("./routes/staticRoute");
const urlRouter = require('./routes/url');
const userRoute = require('./routes/user');

// Connect to the MongoDB database
connectDB('mongodb://localhost:27017/short-url')
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("Failed to connect to DB", err)); // Handle connection errors

// Import and use the URL router
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



app.use('/url', urlRouter);
app.use('/user',userRoute)
app.use("/",staticRouter);


app.get('/url/:shortId',async(req,res)=>{
    const ShortId = req.params.shortId;
    const entry  = await URL.findOneAndUpdate({shortId:ShortId},{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    })
    res.redirect(entry.redirectUrl);
})

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
