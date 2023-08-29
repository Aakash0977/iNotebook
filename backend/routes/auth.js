const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "IAMSKY";

//Route: 1 - Create a USer using: POST "/api/auth/createuser". no login require
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({min:5})
],async (req, res)=>{
    //If there is error return bad request and error message
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({result: result.array()});
    }

    try {
    //check wheather the user email exits already
    let user = await User.findOne({email: req.body.email});

    if(user){
        return res.status(400).json({result : "user with this email is already exist"})
    }

    const salt  = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    

    //create new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass
    })

    const data = {
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    
    res.send({authtoken})

    // res.json(user)

    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurs")
    }
});


//Route: 2 -  Authenticate user using: POST  "api/auth/login". No login require
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Passwoed cannot be blank').exists()
],async (req, res)=>{
     //If there is error return bad request and error message
     const result = validationResult(req);
     if (!result.isEmpty()) {
       return res.status(400).json({result: result.array()});
     }

    const {email, password} = req.body;
     try {
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({error: "Please enter the valid credentials"})
        }

        const passwordCompare = await bcrypt.compare (password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please enter the valid credentials"})
        }

        const data = {
            user:{
                id: user.id
            }
        }
    
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        res.send({authtoken})

     } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurs")
     }

});

// Route: 3 - Get details of logged in user: POST  "api/auth/getuser". No login require
router.get('/getuser',fetchuser, async (req, res)=>{
    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurs")
    }
})

module.exports = router;