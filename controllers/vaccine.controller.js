var VaccineService = require('../services/childControlVaccine.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.getVaccinesByChild = async function (req, res, next) {
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = {id: req.body.id}
    try {
        var Result = await VaccineService.getVaccines(filtro, page, limit)
        return res.status(200).json({status: 200, data: Result, message: "Succesfully Vaccines Received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createVaccine = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Entity = {
        id: req.body.id,
        vaccineId: req.body.vaccineId,
        notes: req.body.notes
    }
    try {
        var createdVaccine = await VaccineService.createVaccine(Entity)
        return res.status(201).json({createdVaccine, message: "Succesfully Created Child"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateVaccine = async function (req, res, next) {
    // Id is necessary for the update
    if (!req.body.id || !req.body.vaccineId) {
        return res.status(400).json({status: 400, message: "Id or VaccineId be present"})
    }
    var Entity = {
        id: req.body.id ? req.body.id : null,
        vaccineId: req.body.name ? req.body.vaccineId : null,
        notes: req.body.username ? req.body.notes : null
    }
    try {
        var updatedChild = await VaccineService.updateVaccine(Entity)
        return res.status(200).json({status: 200, data: updatedChild, message: "Succesfully Updated Child"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeVaccine = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await VaccineService.deleteVaccine(id);
        res.status(200).send("Succesfully Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
