const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, mobile, age, bloodGroup, location, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email, mobile, age, bloodGroup, location, password });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // JWT Token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, msg: 'Registration successful' });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT Token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, msg: 'Login successful' });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//Fetching the data
router.get("/fetchall",(req,res) => {
    Userscheme.find((err,val)=>{
        if (err){
            console.log(err)
        }
        else{
            res.json(val)
        }
    })

});

module.exports = router;
