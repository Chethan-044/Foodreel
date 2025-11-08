//connecting database
const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("mongodb connected");
        
    })
    .catch((err)=>{
        console.log("connection failed",err);
        
    })
}

module.exports = connectDB; // export to server.js