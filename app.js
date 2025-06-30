const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// const student = require('./routes/student.routes');

// app.use('/api/auth', auth);
// app.use('/api/students', student);

module.exports = app