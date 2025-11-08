const userModel = require('../models/user.model')
const foodPartnerModel = require('../models/foodpartner.model')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken") // npm i jsonwebtoken cookie-parser

async function registerUser(req,res){

    const{ fullname , email , password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({email}) // to chech if user already exist or not 
    
    if(isUserAlreadyExists){            
        return res.status(400).json({
            message:"User already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10); // inorder to maintain user privacy, npm i bcryptjs

    const user = await userModel.create({               //if not exist create user
        fullname,
        email,
        password:hashedPassword
    })


    const token = jwt.sign({
        id:user._id,                                                        // for cookie
        
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"User Registered successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullname:user.fullname
        }
    })
}

async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({email})

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    
    
    const token = jwt.sign({
        id:user._id,                                                        // for cookie
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"User logged in successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullname:user.fullname
        }
    })
}

function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User loged out successfully"
    });
}

async function registerFoodPartner(req,res){

 const{fullname , email , password, address, contactName, phone } = req.body;
 console.log("Incoming req.body:", req.body);
 const isAccountAlreadyExists = await foodPartnerModel.findOne({email}) // to chech if user already exist or not
 if(isAccountAlreadyExists){
     return res.status(400).json({
         message:"food partner Account already exist"
     })
 }
 const hashedPassword = await bcrypt.hash(password,10); // inorder to maintain user privacy, npm i bcryptjs
 const foodPartner = await foodPartnerModel.create({  
        fullname,
        email,                                                          //if not exist create user
        password:hashedPassword,
        address,
        contactName,
        phone
    }) 
    
    const token = jwt.sign({
        id:foodPartner._id,                                                        // for cookie
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"food partner Registered successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            fullname:foodPartner.fullname,
            address:foodPartner.address,
            contactName:foodPartner.contactName,
            phone:foodPartner.phone
        }
    })
}

async function loginFoodPartner(req, res) {

    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({email})

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }


    const token = jwt.sign({
        id:foodPartner._id,                                                        // for cookie
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"food partner Logged in successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }
    })
}
function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"food partner logged out successfully"
    });
}
module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}