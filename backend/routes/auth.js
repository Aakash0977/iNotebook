const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "IAMSKY";

//Create a USer using: POST "/api/auth/createuser". no login require
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid passowrd').isLength({min:5})
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

module.exports = router;