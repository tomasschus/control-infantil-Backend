var ControlService = require('../services/childControl.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.getControls = async function (req, res, next) {
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Controls = await ControlService.getAllControls({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Controls, message: "Succesfully Controls Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getControlsById = async function (req, res, next) {
    var id = req.body.id;
    if (!id) {
        return res.status(400).json({status: 400, message: "Child id is required"})
    }
    try {
        var Result = await ControlService.getControls(id)
        if(!Result) {
            res.status(404).json({status: 404, message: "Child not found"})
        }
        return res.status(200).json({status: 200, data: Result, message: "Succesfully Control Received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createControl = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Entity = {
        date:req.body.date,
        place: req.body.place,
        weight: req.body.weight,
        height: req.body.height,
        diameter: req.body.diameter,
        notes: req.body.notes,
        prescription: req.body.prescription,
        childId: req.body.childId
    }
    try {
        var createdOne = await ControlService.createControl(Entity)
        return res.status(201).json({createdOne, message: "Succesfully Created Control"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Control Creation was Unsuccesfull"})
    }
}

exports.updateControl = async function (req, res, next) {
    // Id is necessary for the update
    if (!req.body.id) {
        return res.status(400).json({status: 400., message: "Id be present"})
    }
    var Entity = {
        id: req.body.id ? req.body.id : null,
        place: req.body.place ? req.body.place : null,
        weight: req.body.weight ? req.body.weight : null,
        height: req.body.height ? req.body.height : null,
        diameter: req.body.diameter ? req.body.diameter : null,
        notes: req.body.notes ? req.body.notes : null
    }
    try {
        var updatedOne = await ControlService.updateControl(Entity)
        return res.status(200).json({status: 200, data: updatedOne, message: "Succesfully Updated Control"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeControl = async function (req, res, next) {
    var id = req.params.id;
    if (!id) {
        return res.status(400).json({status: 400, message: "Control id is required"})
    }
    try {
        var deleted = await ControlService.removeControl(id);
        res.status(200).send("Succesfully Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
