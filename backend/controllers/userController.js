import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


// Login User
const loginUser = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User Does Not Exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Register User
const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;
    try {
        // Checking is user Already Exist
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User Already exists"})
        }

        // validating email format and strong password 
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter Valid Email"})
        }

        // Password Checking  
        if(password.length<8){
            return res.json({success:false,message:"please Enter Strong Password"})
        }
        // hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}