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
    console.log("Find information about a class based on its name.");

    try {
        const result = await classService.findOne();
        res.status(200).json({status: true, data: result})
    } catch (err) {
        console.log("Problem in reading class.", err);
        res.status(400).json({status: false, data:err})
    }
}

exports.create = async(req, res) => {
    let data = req.body;

    console.log("Create Class for: ", data.className);

    const newClass = new Class({
        class: data.className,
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
    const className = req.body.classname;
    console.log("Update Class information with name: ", classname);

    const updateClass = {
        hours: req.body.hours,
        ects: req.body.ects
    };

    try {
        const result = await Class.findOneAndUpdate({classname: className}, updateClass, {new:true});
    res.status(200).json({status:true, data:result});
  } catch (err) {
    console.log("Error in updating class info: ", err);
    res.status(400).json({status:false, data: err});
  }

}

exports.delete = async(req, res) => {
    const className = req.params.classname
        console.log("Delete class with name: ", className);
    
    try {
        const result = await Class.findOneAndDelete({classname: className});
        res.status(200).json({status:true, data: result});
    } catch (err) {
        console.log("Problem in deleting class: ", err);
        res.status(400).json({status: false, data: err});
    }
}