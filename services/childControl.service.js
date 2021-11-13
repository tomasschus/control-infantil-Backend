// Gettign the Newly created Mongoose Model we just created 
var ChildControl = require('../models/ChildControl.model');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

exports.getAllControls = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    try {
        var Controls = await ChildControl.paginate(query, options)
        return Controls;
    } catch (e) {
        console.log("error services",e)
        throw Error('Error while Paginating Controls');
    }
}

// Async function to get the User List
exports.getControls = async function (id, page, limit) {
    try {
        let Control = await ChildControl.find({childId: id})
        return Control;
    } catch (e) {
        throw Error('Error while Fetching Controls');
    }
}

exports.createControl = async function (entity) {
    var newControl = new ChildControl({
        childId: entity.childId,
        place: entity.place,
        weight: entity.weight,
        height: entity.height,
        diameter: entity.diameter,
        notes: entity.notes,
        date: new Date()
    })

    try {
        var savedControl = await newControl.save();
        var token = jwt.sign({
            id: savedControl._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Control")
    }
}

exports.updateControl = async function (entity) {
    var id = {ninioId: entity.id}
    try {
        //Find the old User Object by the Id
        var old = await ChildControl.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the ChildControl")
    }
    // If no old Object exists return false
    if (!old) {
        return false;
    }
    //Edit the User Object
    old.place = entity.name
    old.weight = entity.username
    old.height = entity.height
    old.diameter = entity.diameter
    old.notes = entity.notes
    try {
        var savedChild = await old.save()
        return savedChild;
    } catch (e) {
        throw Error("And Error occured while updating the ChildControl");
    }
}

exports.removeControl = async function (id) {
    try {
        var deleted = await ChildControl.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Control could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Control")
    }
}
