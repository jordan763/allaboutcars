const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
// const auth = require("../middleware/auth");

module.exports = {
    register: async (req, res) => {
        try {
            let { email, password, passwordCheck, displayName } = req.body;
            // validate
            if (!email || !password || !passwordCheck)
            return res.status(400).json({ msg: "Not all fields have been entered." });
            if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "The password needs to be at least 5 characters long." });
            if (password !== passwordCheck)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." });
        
            const existingUser = await db.User.findOne({ email: email });
            if (existingUser)
            return res
                .status(400)
                .json({ msg: "An account with this email already exists." });
        
            if (!displayName) displayName = email;
        
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
        
            const newUser = new db.User({
            email,
            password: passwordHash,
            displayName,
            });
            res.json(await newUser.save());
            // res.json(await db.User.create(req.body));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    login: async (req, res) => {
        try {
            let { email, password } = req.body;
        
            // validate
            if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        
            const user = await db.User.findOne({ email: email });
            if (!user)
              return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });
        
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
        
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({
              token,
              user: {
                id: user._id,
                displayName: user.displayName,
              },
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    remove: async (req, res) => {
        try {
            const deletedUser = await db.User.findByIdAndDelete(req.user);
            res.json(deletedUser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    tokenIsValid: async (req, res) => {
        try {
            const token = req.header("x-auth-token");
            if (!token) return res.json(false);
        
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            if (!verified) return res.json(false);
        
            const user = await db.User.findById(verified.id);
            if (!user) return res.json(false);
        
            return res.json(true);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    },
    index: async (req, res) => {
        const user = await db.User.findById(req.user);
        res.json({
            displayName: user.displayName,
            id: user._id,
        });
    },
}
