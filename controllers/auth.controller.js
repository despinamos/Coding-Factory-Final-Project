const bcrypt = require('bcrypt');
const Student = require('../models/student.model');
const authService = require('../services/auth.services');

exports.login = async(req, res) => {
    console.log("Login user to eclass platform:", req.body);

    const username = req.body.username;
    const password = req.body.password;

    try {
        const result = await Student.findOne({username: username}, {username: 1, email: 1, password: 1, roles: 1})
        console.log("User: ", result);
        const isMatch = await bcrypt.compare(password, result.password);

        if (result && result.username === username && isMatch){
              const token = authService.generateAccessToken(result)
              res.status(200).json({status: true, data: token});
            } else {
              res.status(404).json({status: false, data: "User not logged in."});
            }
    } catch (err) {
        console.log("Problem in login", err);
        res.status(400).json({status: false, data: err})
    }
}