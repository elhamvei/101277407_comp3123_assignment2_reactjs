const express = require("express")
const EmployeeModel = require('../models/EmployeeModel');
const routes = express.Router()

routes.route('/employees')
    .get(async (req, res) => {

        try {
            const employees = await EmployeeModel.find()
            res.status(200).send(employees)
        } catch (error) {
            res.status(500).send(error)
        }
    })
    .post(async (req, res) => {
        try {
            const obj = { ...req.body };
            const newEmployee = new EmployeeModel(obj);
            await newEmployee.save()
            res.status(201).send(newEmployee)
        } catch (error) {
            res.status(500).send(error)
        }
    });

routes.get("/employees/:employeeId", async (req, res) => {
    try {
        const findEmployee = await EmployeeModel.findById(req.params.employeeId)
        res.status(200).send(findEmployee)
    } catch (error) {
        res.status(500).send(error)
    }
});

routes.put("/employees/:employeeId", async (req, res) => {
    try {
        const obj = { ...req.body };
        const updateEmployee = await EmployeeModel.findByIdAndUpdate(req.params.employeeId, obj, { runValidators: true })
        res.status(200).send(updateEmployee)
    } catch (error) {
        res.status(500).send(error)
    }
});

routes.delete("/employees/:employeeId", async (req, res) => {

    try {
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.employeeId)
        res.status(204).send(deletedEmployee)
    } catch (error) {
        res.status(500).send(error)
    }
});


module.exports = routes