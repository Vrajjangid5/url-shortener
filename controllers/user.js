const User = require("../models/user");

async function handleSignUp(req,res){
    const {name,email,password}=req.body;
    
    const newUser= await User.create({
        name,
        email,
        password,
    });
    await newUser.save();
    return res.render("home");

}

module.exports = {handleSignUp,}