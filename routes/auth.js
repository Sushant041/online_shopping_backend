const express = require('express')
const router = express.Router()
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const jwt_secret = 'youareanowauser';

//Creating a Useer using: POST "/api/auth/createuser". 
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min : 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min : 5 }),
], async (req, res)=>{

    //checking errors and returnng them
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    // check whether the user with this email exists already
    try {
        
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "user with this email already exists"})
    }
      
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

     //create a user 
        user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    })
    const data ={
        user:{
           id: user.id
        }
    }
    const authtoken = jwt.sign(data, jwt_secret);


    //  res.json(user);
     res.json({authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router;