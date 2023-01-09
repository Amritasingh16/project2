const express=require("express");
const router=express.Router();
const CollegeController=require("../controllers/collegeController")
const InternController=require("../controllers/internController")



router.post("/functionup/colleges",CollegeController.createCollege)
router.post("/functionup/interns",InternController.createIntern)
router.get("/functionup/collegeDetails",CollegeController.getCollegeDetails)



module.exports=router