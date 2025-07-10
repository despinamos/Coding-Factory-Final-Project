const Student = require('../models/student.model');
const studentService = require('../services/student.services');
const bcrypt = require('bcrypt');

exports.findAll = async(req, res) => {
  console.log("Find all students from collection students");

  try {
    const result = await studentService.findAll();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in reading students", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.findOne = async(req, res) => {
    console.log("Find one student based on username.");

    try {
        const result = await studentService.findOne();
        res.status(200).json({status: true, data: result})
    } catch (err) {
        console.log("Problem in reading student", err);
        res.status(400).json({status: false, data:err})
    }
}

exports.create = async(req, res) => {
    console.log("Create Student");
    let data = req.body;
    const SaltOrRounds = 12;

    let hashedPassword = "";
    if (data.password)
        hashedPassword = await bcrypt.hash(data.password, SaltOrRounds)

    const newStudent = new Student({
        username: data.username,
        password: hashedPassword,
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age,
        email: data.email,
        address: {
        area: data.address.area,
        road: data.address.road
        },
        phone: {
            type: data.phone.type,
            number: data.phone.number
        }
    });

    try{
        const result = await newStudent.save();
        res.status(200).json({status: true, data: result});
    } catch (err) {
        console.log("Error in creating student: ", err);
        res.status(400).json({status: false, data: err});
    }    
}

exports.update = async(req, res) => {
    const username = req.body.username;
    console.log("Update Student with username: ", username);

    const updateStudent = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        address: {
        area: req.body.address.area,
        road: req.body.address.road
        },
        phone: {
            type: req.body.phone.type,
            number: req.body.phone.number
        }
    };

    try {
        const result = await Student.findOneAndUpdate({username: username}, updateStudent, {new:true});
    res.status(200).json({status:true, data:result});
  } catch (err) {
    console.log("Error in updating student: ", err);
    res.status(400).json({status:false, data: err});
  }

}

exports.delete = async(req, res) => {
    const username = req.params.username
        console.log("Delete student with username", username);
    
    try {
        const result = await Student.findOneAndDelete({username:username});
        res.status(200).json({status:true, data: result});
    } catch (err) {
        console.log("Problem in deleting student: ", err);
        res.status(400).json({status: false, data: err});
    }
}