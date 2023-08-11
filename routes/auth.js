const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
// const Token = require("../models/token");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");


const jwt_secret = "youareanowauser";

// Route-1: Creating a User using: POST "/api/auth/createuser".
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;

    //checking errors and returnng them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        console.log(req.body);
        return res
          .status(400)
          .json({ success, error: "user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);


       //create a user          
       user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
        
      //creating token 
      // const token = await new Token({
      //   userId: user.id,
      //   token: crypto.randomBytes(32).toString("hex"),
      // }).save()
      // const url = `http://localhost:3000/user/${user.id}/verify/${token.token}`;

      // await sendEmail( {email: user.email, subject: "An Email sent to your account please verify", text: url})


      const data = {
        user: {
          id: user.id,
        },
      };
      // message: "An Email sent to your account please verify",


      const authtoken = jwt.sign(data, jwt_secret);

      success = true;
      // res.json({ success, authtoken });
      res.status(201).send({ success, authtoken});
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

  // router.get(":id/verify/:token", async (req, res) =>{
  //    try {
  //        const user = await User.findOne({_id:req.params.id});
  //        if(!user){
  //         return res.status(400).send({message:"Invalid link"});
  //       }

  //       const token = await Token.findOne({
  //         userId:user._id,
  //         token:req.params.token
  //       })
  //      if(!token){
  //       return res.status(400).send({message:"Invalid link"});
  //      }

  //        await User.updateOne({_id: user._id, verified: true});
  //        await token.remove()

  //        res.status(200).send({message: "Email verified successfully"})

  //     } catch (error) {
  //          res.status(500).send({message: "Internal Server Error"});
  //    }
  // })

// Route-2: Authenticate  a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // res.headers('Access-Control-Allow-Origin', 'http://localhost:3000/login');

    //checking errors and returnng them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Invalid email or password" });
      }

      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ success, error: "Invalid email or password" });
      }

      // if(!user.verified){
      //   let token = await Token.findOne({userId: user._id});
      //   if(!token){
      //     token = await new Token({
      //       userId: user._id,
      //       token: crypto.randomBytes(32).toString("hex"),
      //     }).save()
      //     const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
      //     await sendEmail(user.email, "Verify Email", url);    
      //   }
      //   return res.status(400).send({message: "An Email is sent to your account please verify"});
      // }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route-3: Getting details of a User using: POST "/api/auth/getuser". Login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;
