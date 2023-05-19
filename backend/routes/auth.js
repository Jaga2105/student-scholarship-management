const express=require('express')
const User=require("../models/User")
const { default: mongoose } = require('mongoose')
const router=express.Router()
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require("../middleware/fetchuser")

const JWT_SECRET="Jagaisagoodboy"

const { body, validationResult } = require('express-validator');


//Route 1:Create a user using POST: '/api/auth/createuser'. Doesn't reqiuire auth
router.post('/createuser',[body('name','Entar a valid name').isLength({min:3}),
body('email','Enter a valid email').isEmail(),
body('password','Password must be atleast 5 characters').isLength({min:5}),
body('phone','Phone no. must be of exact 10 digits'),
body('rollno','Roll no is of exact 6 characters')
],async (req,res)=>{
    // If there are errors then return bad request and error details
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }
    // check whether the user with same email exist already
    try{
   let user=await User.findOne({email:req.body.email});
   console.log(user)
   if(user){
    return res.status(400).json({success,error:"Sorry a user with the same email already exists"})
   }
   const salt=await bcrypt.genSalt(10)
   const secPass= await bcrypt.hash(req.body.password,salt); 
    user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass,
        phone:req.body.phone,
        rollno:req.body.rollno
    })
    // .then(user=>res.json(user));
    const data={
        user:{
            id:user.id
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET)
    success=true
    res.json({success,authToken})
}catch(error){
    console.error(error.message)
    res.status(500).send("Internal Server Error")
}
})




// Route 2: Authenticate a User using : POST:"/api/auth/login", No login required
router.post('/login',[
body('email','Enter a valid email').isEmail(),
body('password','Password can not be blank').exists()
],async (req,res)=>{
    // If there are errors then return bad request and error details
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        success=false
        return res.status(400).json({success,errors:errors.array()});
    }

    const {email,password}=req.body
    try {
        let user=await User.findOne({email})
        if(!user){
            success=false
            return res.status(400).json({success,error:'Please login with correct credentials'})
        }

        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success=false
            return res.status(400).json({success,error:"Please login with correct credentials"})
        }

        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        success=true;
        res.json({success,authToken})
        console.log(success)
    } catch (error) {
        console.error(error.message)
    res.status(500).send("Internal Server Error")
    }
})


// Route 3: Get loggedin user details using: POst:"/api/auth/getuser".  Log in  required
router.post('/getuser',fetchuser,async (req,res)=>{

    try {
        userId=req.user.id
        const user=await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
    res.status(500).send("Internal Server Error")
    }
})

module.exports=router