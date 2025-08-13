const mongoose = require('mongoose')

const Schema = mongoose.Schema

let classSchema = new Schema({
  class: {type:String},
  hours: {type:Number},
  ects: {type: Number}
},
{
  collection: 'classes',
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model("Class", classSchema)