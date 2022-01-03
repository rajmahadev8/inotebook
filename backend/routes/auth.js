const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "iNotebook"
let success=false;

//Route 1 :- Create a user using: POST "/api/auth/createuser". No Login Required
router.post('/createuser', [body('name').isLength({ min: 3 }),
                            body('email', 'Enter a Valid Email').isEmail(),
                            body('password', 'Password length must be atleast 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        
        //If there are errors return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {//Find the User exists or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" });
            }
            //Encrypting Password
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt);
            //Creating a new User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            //Using Javascript Web token for authentication for unique id
            const data = {
                user:{
                    id : user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            success = true;
            res.json({success, authToken});
        }

        catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal Server error occured");
        }
    }
);

//Route 2 :- Authenticate a User using: POST "/api/auth/login". No Login Required
router.post('/login', [body('email', 'Enter a Valid Email').isEmail(),
                            body('password', 'Password Cannot be Blank').isLength({ min: 5 })],
        async (req,res)=>{

         //If there are errors return Bad request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {email,password} = req.body;
            try {
                let user = await User.findOne({email});
                if (!user) {
                    return res.status(400).json({ success, error: "Please try login with correct credentials" });
                }
                const passwordCompare = await bcrypt.compare(password,user.password);
                if(!passwordCompare){
                    return res.status(400).json({ success, error: "Please try login with correct credentials" });
                }

                const data = {
                    user:{
                        id : user.id
                    }
                }
                const authToken = jwt.sign(data, JWT_SECRET);
                success = true;
                res.json({success,authToken});

            } catch (error) {
                console.error(error.message);
                res.status(500).send("Some Internal server error occured");
            }

        }
);

//Route 3 :- Get user Loggedin user details: POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser ,
        async (req,res)=>{
         //If there are errors return Bad request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const userId=req.user.id;
                const user = await User.findById(userId).select("-password");
                res.send(user);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Some Internal server error occured");
            }
        }
);
module.exports = router;