const express = require("express")
const crypto = require("crypto");
const UserModel = require('../models/UserModel');
const routes = express.Router()

const salt = 'vOVH6sp90NWjRRIq'.toString('hex');

const hash_password = (password) => {
    const hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);
    return hash;
}

routes.post('/signup', async (req, res) => {

    try {
        const obj = { ...req.body };
        obj.password = hash_password(obj.password);
        const newUser = new UserModel(obj);
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) {
        if(error.code === 11000)
            res.status(401).json({
                status: false,
                message: `${JSON.stringify(error.keyValue).replace(/"/g,'')} is Repetitive. please fill it with different value.`
            })
        else
            res.status(500).send(error)
    }
}
);

routes.post('/login', async (req, res) => {

    try {
        const user = await UserModel.findOne({ userName: req.body.userName });
        if (user && hash_password(req.body.password)===user.password)
            res.status(200).json({
                status: true,
                username: user.userName,
                message: "User logged in successfully",
                jwt_token: " I do not implement it (Optional)"
            })
        else
            res.status(401).json({
                status: false,
                message: "Invalid Username and password"
            });
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = routes