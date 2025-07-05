const Student = require('../models/student.model');

function findAll() {
  const result = Student.find();
  return result;
}

function findOne(username) {
  const result = Student.findOne({username:username});
  return result;
}

module.exports = { findAll, findOne }