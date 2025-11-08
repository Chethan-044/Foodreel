//create server

const express  = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const getFoodPartnerById = require("./routes/food-partner.routes")
const cors = require('cors')


const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser());    
app.use(express.json()); //middleware helps to read data in req.body, ->auth.controller.js

app.get("/",(req,res)=>{
    res.send("hello");
})
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/foodpartner', getFoodPartnerById);


module.exports=app;