const InternModel= require("../models/intern")
const CollegeModel= require("../models/college")

//=================================CREATE INTERNS================================
const createIntern= async function(req,res){
  try{  
    let data= req.body

    if(data.length==0) return res.status(404).send({status:false, ERROR: "Data required"})

    let collegeId= await CollegeModel.findOne({name:data.collegeName,isDeleted:false})
      if(!collegeId){
       return res.status(400).send({status: false, ERROR: "College not Found"})
     }
        data.collegeId=collegeId._id
        let created= await InternModel.create(data)
        if(!created) {
         return res.send(400).send({status: false, ERROR: "Enter valid details"})
        }else{
    
        res.status(201).send({ status: true, data:{isDeleted:created.isDeleted,
       name:created.name,
       email:created.email,
       mobile:created.mobile,
       collegeId:created.collegeId}})
    }
  }catch(error){
    res.status(500).send({ status: false, error: error.message })
  }
}




module.exports.createIntern=createIntern