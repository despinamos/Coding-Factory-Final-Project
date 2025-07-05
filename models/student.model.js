const mongoose = require("mongoose");

const Schema = mongoose.Schema

let addressSchema = new Schema({
  area: {type: String},
  road: {type: String}
}, {_id: false})

let phoneSchema = new Schema({
  type: {type: String},
  number: {type: String}
}, {_id: false})

let classSchema = new Schema({
  class: {type:String},
  hours: {type:Number}
})

let studentSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    max: 20,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is a required field'],
    max: 20
  },
  firstname: {
    type: String,
    required: [true, 'Firstname is a required field'],
    max: 20
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is a required field'],
    max: 20
  },
  email: {
    type: String,
    required: [true, 'Email is a required field'],
    max: 20,
    unique: true,
    trim: true,
    lowercase: true
  },
  address: addressSchema,
  phone: {type: [phoneSchema], null: true},
  classes: {type: [classSchema], null: true}
},
{
  collection: 'students',
  timestamps: true
})

module.exports = mongoose.model("Student", studentSchema)