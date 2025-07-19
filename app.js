const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const auth = require('./routes/auth.routes');
const student = require('./routes/student.routes');
const studentClass = require('./routes/student.classes.routes')

app.use('/api/auth', auth);
app.use('/api/students', student);
app.use('/api/student-class', studentClass)

module.exports = app