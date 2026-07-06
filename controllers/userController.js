

const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.userRegister =async(req,res)=>{
    try {
        const {name , email ,password} = req.body

         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }
        const userRecord = await User.findOne({email})
        
        if(userRecord){
            return res.status(400).json({message:"email already exists"})
        }

        const hashePassword = await bcrypt.hash(password ,10)

        const user =  await User.create({
            name ,email ,password:hashePassword
        })
        
        return res.status(200).json({message:"user Registered"})

    } catch (error) {
        res.status(500).json({message:`somthig wrong ${error.message}`})
    }


}


exports.userLogin=async(req ,res)=>{
    try {
        const {email ,password} = req.body;

        const userRecord = await User.findOne({email})
        console.log(userRecord)
        if(!userRecord){
            return res.status(400).json({message:"email not match Invalid credentials"})
        }
        const userPasswords = await bcrypt.compare(password , userRecord.password)
        if(!userPasswords){
             return res.status(400).json({message:"password is wrong"})
        }

        const token = jwt.sign({
            userId : userRecord._id
        },process.env.JWT_SECRET,{expiresIn:"1d"})



            return res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({message:`errormessager,${error.message}`})
    }
}