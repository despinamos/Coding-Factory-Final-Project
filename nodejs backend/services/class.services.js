const Class = require('../models/class.model');

function findAll() {
  const result = Class.find();
  return result;
}

function findOne(className) {
  const result = Class.findOne({class:className});
  return result;
}

module.exports = { findAll, findOne }