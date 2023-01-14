const CollegeModel = require("../models/college")
const InternModel = require("../models/intern")
const axios =require("axios")
const { findOne } = require("../models/college")

//==============================CREATING COLLEGE===============================
let nameRegex = /^[a-z]{3,}$/
let fullNameRegex= /^[a-z ,A-Z]*$/

const createCollege = async function (req, res) {
  try {
    let data = req.body;

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "All Keys are Mandatory" });

  const { name, fullName, logoLink } = data;

  // name validation----------------------------------------
  if (!name)return res.status(400).send({ status: false, message: "Name is required" });
  if(!name.match(nameRegex)) return res.status(400).send({ status: false, message: "Name must contain only lowercase letters, no space and minimum 3 letters" });
  const nameAlreadyPresent= await CollegeModel.findOne({name:name})
  if(nameAlreadyPresent) return res.status(400).send({status:false,message:"Name Already Present"})


  //fullName validation-------------------------------------
  if (!fullName) return res.status(400).send({ status: false,ERROR: "Fullname is required" });
  if(!fullName.match(fullNameRegex)) return res.status(400).send({ status: false,message: "Fullname must contain minimum 3 letters" });


  // logoLink validation------------------------------------
  if(!logoLink)  return res.status(400).send({status:true,ERROR:"Logo link is required"})
  let urlfound = false;
  // let url = { method: 'get', url: logoLink };

  await axios.get(logoLink)
  .then((result) => {
  if ( result.status == 201 || result.status == 200 )
      urlfound = true;
  })
  .catch((err) => {});

  if (urlfound == false) return res.status(400).send({status: false, message: "Invalid Logo link" })

  
  
    let created = await CollegeModel.create(data)
    res.status(201).send({ status: true, data: created })
  } catch (error) {
    res.status(500).send({ status: false, ERROR: error.message })
  }
}


//======================GETTING COLLEGE DETAILS====================================

const getCollegeDetails = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin","*")
  try {

    let data=req.query
    let collegeName = req.query.collegeName;

    if(Object.keys(data).length==0) return res.status(400).send({status: false, message: "Enter some data"})

    if(!collegeName) return res.status(400).send({status:false,message:"Provide College Name"})
    
    let findByName = await CollegeModel.findOne({ name: collegeName, isDeleted: false })

   
    if (!findByName) return res.status(404).send({ status: false, message: "College not found" })
    
     let findData = await InternModel.find({ collegeId: findByName._id }).select({ collegeId: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })


    if (findData.length == 0) return res.status(404).send({ status: false, message: "No intern found" })
   
    const sendData = {
              name: findByName.name,
              fullName: findByName.fullName,
              logoLink: findByName.logoLink,
              interns: findData
            }
            res.status(200).send({  data: sendData })
  }
  catch (error) {
    res.status(500).send({ status: false, ERROR: error.message })
  }
}



module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails

