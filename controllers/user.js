const User = require("../models/user");


async function handleSignUp(req,res){
    const {name,email,password}=req.body;

    const newUser= await User.create({
        name,
        email,
        password,
    });
    await newUser.save();
    return res.redirect("/");

}

async function handleLogin(req,res){
    const {email,password}=req.body;

    const user= await User.findOne({
        email,
        password,
    });
    if(!user) return res.render('login',{error:"invalid Email or Password"})
    const token= await user.getJWT();
    res.cookie("token",token,{expires:new Date(Date.now()+8*3600000),});
    return res.redirect("/");

}

module.exports = {handleSignUp,handleLogin}