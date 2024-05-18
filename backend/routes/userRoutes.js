const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post('/signup', async (req, resp) => {
    const { name, email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        console.log("signup user ::1", user);
        if (user) {
            return resp.status(400).json({ Error: "User already exits. " })
        }

        user = new User({
            name,
            email,
            password
        })
        console.log("signup user ::2", user);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        console.log("signup user ::3", user);
        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                resp.json({ "token": token });
            }
        );

    } catch (error) {
        console.log("Error ::", error);
        return resp.status(500).json({ Error: "Server error" });
    }
})

router.post("/signing", async (req, resp) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log("signing user::", user);
        if (!user) {
            return resp.status(400).json({ Error: "User not found. " })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return resp.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                resp.json({ "token": token });
            }
        );

    } catch (error) {
        console.log("Error ::", error);
        return resp.status(500).json({ Error: "Server error" });
    }
})


module.exports = router;