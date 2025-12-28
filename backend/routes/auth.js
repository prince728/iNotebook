const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser =  require('../middleware/fetchUser')

const JWT_SECRET = "your_jwt_secret_key_here";


//create a user using POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ success, email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success= true;
        res.json({success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//Route 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login',
    [body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()], async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    });




//Route-3: get loggedIn user detail using POST: "/api/auth/getuser", login required
router.post('/getuser',fetchUser, async (req, res) => {
    try {
        const userId= req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;