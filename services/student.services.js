const Student = require('../models/student.model');

function findAll() {
  const result = Student.find();
  return result;
}

function findOne(username) {
  const result = Student.findOne({username:username});
  return result;
}

async function findLastInsertedStudent() {
  console.log("Finding last inserted student...");

  try {
    const result = await Student.find().sort({_id: -1}).limit(1);
    console.log("Success in finding student.", result[0]);
    return result[0]
  } catch(err) {
    console.log("Problem in finding last inserted student.", err);
    return false;
  }
}

module.exports = { findAll, findOne, findLastInsertedStudent }