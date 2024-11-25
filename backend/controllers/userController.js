
const userModel = require('../config/models/userModel.js')
const bcrypt = require('bcryptjs')


//loginController callback
const loginController = async(req,res)=>{

    try{
       const {email,password} = req.body;
       const user = await userModel.findOne({email})
       if(!user){  
        return res.status(404).json({success:false, message: "User not found"})
       }
         // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
       res.status(200).json({success:true,user});
    }
    catch(error){
      res.status(400).json({success:false,error})
    }
}

// registerController callback
const registerController = async(req,res)=>{
  try{
    const {name,email,password} = req.body;
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({success:true, newUser});
  }
  catch(error){
    res.status(400).json({success:false,error})
  }

}
module.exports = {loginController,registerController};