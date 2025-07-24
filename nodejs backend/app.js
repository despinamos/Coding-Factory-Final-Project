const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const auth = require('./routes/auth.routes');
const student = require('./routes/student.routes');
const classRoutes = require('./routes/class.routes');
const studentClass = require('./routes/student.classes.routes');

app.use('/api/auth', auth);
app.use('/api/students', student);
app.use('/api/classes', classRoutes);
app.use('/api/student-class', studentClass);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument.options)
);

module.exports = app