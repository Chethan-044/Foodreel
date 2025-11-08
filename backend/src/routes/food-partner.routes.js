const express =require("express");
const foodPartnercontroller = require("../controllers/food-partner.controller") 
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();

router.get('/:id', (req, res, next) => {
//   console.log("✅ Route reached with ID:", req.params.id);
  next();
}, authMiddleware.authUserMiddleware, foodPartnercontroller.getFoodPartnerById);


module.exports = router;


