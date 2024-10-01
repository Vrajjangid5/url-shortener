const User = require("../models/user");
const Jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.redirect("/login");
        }

        const decodedMsg = await Jwt.verify(token, "@Vrajjangid123#@!");
        const { _id } = decodedMsg;
        const user = await User.findById(_id);

        if (!user) {
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Error during authentication:", err.message);
        res.status(400).send({ error: "Invalid token or authentication failed", details: err.message });
    }
};

const checkAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        // If there is no token, simply proceed to the next middleware (e.g., serve the homepage)
        if (!token) {
            return next();
        }

        const decodedMsg = await Jwt.verify(token, "@Vrajjangid123#@!");
        const { _id } = decodedMsg;
        const user = await User.findById(_id);

        if (!user) {
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Error during authentication check:", err.message);
        res.status(400).send({ error: "Something went wrong", details: err.message });
    }
};


module.exports = {
    userAuth,
    checkAuth,
};
