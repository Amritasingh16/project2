const CollegeModel = require("../models/college")
const InternModel = require("../models/intern")


//==============================CREATING COLLEGE===============================

const createCollege = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length == 0) {
      return res
          .status(400)
          .send({ status: false, message: "All Keys are Mandatory" });
  }

  const { name, fullName, logoLink } = data;

  if (!name) {
      return res.status(400).send({ status: false, msg: "Name is required" });
  }

  if (!fullName) {
      return res.status(400).send({ status: false, msg: "Fullname is required" });
  }

  // if (!logoLink) {
  //     return res
  //         .status(400)
  //         .send({ status: false, msg: "LogoLink is not a valid " });
  // }

  
  
    let created = await CollegeModel.create(data)
    res.status(201).send({ status: true, data: created })
  } catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}


//======================GETTING COLLEGE DETAILS====================================

const getCollegeDetails = async function (req, res) {
  try {
    let data = req.query.collegeName;
    if(!data) return res.status(404).send({status: false, ERROR: "Data not found"})

    let findByName = await CollegeModel.findOne({ name: data, isDeleted: false })

   
    if (!findByName) {

      return res.status(404).send({ status: false, msg: "College not found" })
    }
     let findData = await InternModel.find({ collegeId: findByName._id }).select({ collegeId: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    if (findData.length == 0) return res.status(404).send({ status: false, msg: "no intern found" })
   
    const sendData = {
              name: findByName.name,
              fullName: findByName.fullName,
              logoLink: findByName.logoLink,
              intern: findData
            }
            res.status(200).send({ status: true, data: sendData })
  }
  catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}



module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails