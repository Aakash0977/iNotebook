    const express = require('express');
    const router = express.Router();
    const User = require('../models/User');
    const {body, validationResult} = require('express-validator')

    //Create a USer using: POST "/api/auth". Doesn't require auth
    router.post('/',[
        body('name', 'Enter a valid name').isLength({min:3}),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter a valid passowrd').isLength({min:5})
    ], (req, res)=>{
        const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(400).json({result: result.array()});
        }
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(user => res.json(user))
        .catch(err => {console.log(err)
        res.json({result:'please enter unique value', message: err.message})});
    })

    module.exports = router;