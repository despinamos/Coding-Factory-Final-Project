const Student = require('../models/student.model')

exports.findAll = async(req, res) => {
    console.log("Find classes from all students.")

    try {
        const result = await Student.find({}, {username: 1, classes: 1, _id:0});
        res.status(200).json({status: true, data: result});
    } catch (err) {
        console.log("Problem in finding classes.");
        res.status(400).json({status: false, data: err});
    }

}

exports.findOne = async(req, res) => {
      console.log("Find classes from a specific student.")
      const username = req.params.username;
    
      try {
        const result = await Student.findOne({username: username}, {username:1, classes:1, _id:0});
        res.status(200).json({status:true, data: result});
      } catch (err) {
        console.log("Problem in finding student's classes", err);
        res.status(400).json({status:false, data:err})
      }
}

exports.create = async(req, res) => {
    console.log("Insert class to Student.");
      const username = req.body.username;
      const classes = req.body.classes;
    
      try {
        const result = await Student.updateOne(
          {username: username},
          {
            $push: {
              classes: classes
            }
          }
        );
        res.status(200).json({status:true, data: result});
      } catch (err) {
        console.log("Problem in adding Class.", err);
        res.status(400).json({status:false, data:err})
      }
}

exports.update = async(req, res) => {
    const username = req.body.username;
      const class_id = req.body.class.classname;
      const class_hours = req.body.class.hours;
      const class_ects = req.body.class.ects;
    
      console.log("Update class for Student with username: ", username);
      try {
        const result = await Student.updateOne(
          {username: username, "classes.class": class_id},
          { $set: {
            "classes.$.hours": class_hours,
            "classes.$.ects": class_ects
          }}
        );
        res.status(200).json({status: true, data: result});
      } catch(err) {
        console.log("Problem updating Class information: ", err)
        res.status(400).json({status: false, data: err});
      }
}

exports.delete = async(req, res) => {
    const username = req.params.username;
    const class_name = req.params.className;
      
    console.log("Delete Class from Student with username ", username, " and Class name: ", class_name);
    
    try {
       const result = await Student.updateOne(
        {username: username},
         {
           $pull: {
             classes:{class: class_name}
           }
        }
       );
        res.status(200).json({status: true, data: result});
    } catch (err) {
       console.log("Problem in deleting Class from Student.", err);
       res.status(400).json({status: false, data: err})
    }
}