const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get('/',async(req,res)=>{
    const allUrl = await URL.find({})
    return res.render("home",{
        urls:allUrl,
    });
})
router.get("/signup",(req,res)=>{
    return res.render("signUp");
})

module.exports = router