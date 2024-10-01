const mongoose = require("mongoose");
const validator = require('validator');
const Jwt = require("jsonwebtoken");
// const bcrypt =require("bcrypt");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: [true, "Email is required"], // Custom error message
        lowercase: true, // Automatically converts email to lowercase
        trim: true, // Trims whitespace
        unique: true, // Ensures no duplicate emails
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"], // Password is required
        minlength: [6, "Password must be at least 6 characters long"], // Minimum length validation
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password cannot contain 'password'");
            }
        }
    },
});

userSchema.methods.getJWT= async function(){
    const user=this;

    const token = await Jwt.sign({_id:user._id},"@Vrajjangid123#@!",{expiresIn:'2d'});
    return token;
}

const User = mongoose.model("User",userSchema);
module.exports = User;