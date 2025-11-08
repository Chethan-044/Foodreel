const express = require('express');
const foodcontroller = require("../controllers/food.controller") 
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();


const multer = require('multer');       // npm i multer, used to handle files like videos...
const upload = multer({
    storage: multer.memoryStorage()
})

// post api/food/ [protected]
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,upload.single('video'),
    foodcontroller.createFood);


router.get('/', 
    authMiddleware.authUserMiddleware,
    foodcontroller.getFoodItems);


router.post('/like', 
    authMiddleware.authUserMiddleware,
foodcontroller.likefood)


module.exports =router;