const foodModel = require("../models/food.model")
const storageservices = require("../services/storage.services")
const likeModel = require("../models/likes.model")
const { v4:uuid } = require("uuid")



async function createFood(req,res){
   if (!req.file) {
            return res.status(400).json({ message: "Video file is required." });
        }
    const fileuploadresult = await storageservices.uploadFile(req.file.buffer,uuid());
    const fooditem = await foodModel.create({
        name:req.body.name,
        video:fileuploadresult.url,
        description:req.body.description,
        foodPartner:req.foodPartner._id
    })

    res.status(201).json({
        message: "food created successfully",
        food: fooditem
    })
}

async function getFoodItems(req,res){ 
    const foodItems  = await foodModel.find({})
    res.status(200).json({
        message:"food items fetched successfully",
        foodItems
    })
}

async function likefood(req,res){
    const {foodId} = req.body;
        const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message:"Food liked",
        like
    })
}

module.exports = {
    createFood,
    getFoodItems,
    likefood
}