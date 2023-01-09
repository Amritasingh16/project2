const InternModel= require("../models/intern")
const CollegeModel= require("../models/college")
const createIntern= async function(req,res){
  try{  
    let data= req.body
    let collegeId= await CollegeModel.findOne({name:data.collegeName})
    // console.log(getData)
    data.collegeId=collegeId._id
    let created= await InternModel.create(data)
    
    res.status(201).send({ status: true, data: created})
  }catch(error){
    res.status(500).send({ status: false, error: error.message })
  }
}




module.exports.createIntern=createIntern