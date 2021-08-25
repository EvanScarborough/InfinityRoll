const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const auth = require("../middleware/auth");







router.post("/signup",
    [
        check("username", "Please enter a valid username").not().isEmpty(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.errors[0].msg,
                errors: errors.array()
            });
        }

        const { username, password } = req.body;

        try {
            let user = await User.findOne({ username });
            if (user) return res.status(400).json({ message: "That username is already in use" });

            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                username,
                password: hashedPassword
            });

            await user.save();

            const payload = { user: { id: user.id } };

            jwt.sign(payload, process.env.JWT_KEY, { },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({ token });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error creating user");
        }
    }
);








router.post("/login",
    [
        check("username", "Please enter a valid username").not().isEmpty(),
        check("password", "Please enter a valid password").not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.errors[0].msg,
                errors: errors.array()
            });
        }
    
        const { username, password } = req.body;

        try {
            let user = await User.findOne({ username });
            if (!user) return res.status(400).json({ message: "User does not exist" });
         
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Incorrect password!" });
         
            const payload = { user: { id: user.id } };
         
            jwt.sign(payload,  process.env.JWT_KEY, { },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({ token });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server error"
            });
        }
    }
);




router.get("/me", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        // remove the password from the response
        const userFiltered = { id: user._id, username: user.username, admin: user.admin, createdAt: user.createdAt }
        res.json(userFiltered);
    } catch (e) {
        res.send({ message: "Error fetching user" });
    }
});



module.exports = router;