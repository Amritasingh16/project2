const CollegeModel= require("../models/college")
const InternModel= require("../models/intern")
 const createCollege=  async function(req,res){
  try{  
    let data= req.body
    let created= await CollegeModel.create(data)
    res.status(201).send({status: true, data: created})
  }catch(error){
    res.status(500).send({status: false, error: error.message })
  }
 }

 const getCollegeDetails= async function(req,res){
    try{
    let data = req.query.collegeName;
    // data.isDeleted=false;
    let findByName=await CollegeModel.findOne({name:data})
    findByName=findByName.toObject();
    if(!findByName){
        return res.status(404).send({status:false,msg:"college not found"})
    }
    console.log(findByName)

    
let findData = await InternModel.find({ collegeId: findByName._id });
    console.log(findData)
    findByName.interns=findData
    res.status(200).send({status:true,data:findByName})
    }
    catch(error){
    res.status(500).send({status: false, error: error.message})
    }
 }



 module.exports.createCollege=createCollege
 module.exports.getCollegeDetails=getCollegeDetails