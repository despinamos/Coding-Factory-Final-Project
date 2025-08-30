const Class = require('../models/class.model');
const classService = require('../services/class.services');

exports.findAll = async(req, res) => {
  console.log("Find all classes.");

  try {
    const result = await classService.findAll();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in reading classes.", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.findOne = async(req, res) => {
    const classname = req.params.className;
    console.log("Find information about a class based on its name: ", classname);

    try {
        const result = await classService.findOne(classname);
        console.log(result)
        res.status(200).json({status: true, data: result})
    } catch (err) {
        console.log("Problem in reading class.", err);
        res.status(400).json({status: false, data:err})
    }
}

exports.create = async(req, res) => {
    let data = req.body;

    console.log("Create Class for: ", data.class);

    const newClass = new Class({
        class: data.class,
        hours: data.hours,
        ects: data.ects,
    });

    try{
        const result = await newClass.save();
        res.status(200).json({status: true, data: result});
    } catch (err) {
        console.log("Error in creating class: ", err);
        res.status(400).json({status: false, data: err});
    }    
}

exports.update = async(req, res) => {
    const className = req.body.class;
    console.log("Update Class information with name: ", className);

    const updateClass = {
        hours: req.body.hours,
        ects: req.body.ects
    };

    try {
        const result = await Class.findOneAndUpdate({class: className}, updateClass, {new:true});
        res.status(200).json({status:true, data:result});
  } catch (err) {
        console.log("Error in updating class info: ", err);
        res.status(400).json({status:false, data: err});
  }

}

exports.delete = async(req, res) => {
    const className = req.params.className
        console.log("Delete class with name: ", className);
    
    try {
        const result = await Class.findOneAndDelete({class: className});
        res.status(200).json({status:true, data: result});
    } catch (err) {
        console.log("Problem in deleting class: ", err);
        res.status(400).json({status: false, data: err});
    }
}