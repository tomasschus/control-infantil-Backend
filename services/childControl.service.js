// Gettign the Newly created Mongoose Model we just created 
var NinioControl = require('../models/ChildControl.model');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getControls = async function (query, page, limit) {
    var options = {
        page,
        limit
    }
    try {
        console.log("Query",query)
        var Controls = await NinioControl.paginate(query, options)
        return Controls;

    } catch (e) {
        console.log("error services",e)
        throw Error('Error while Paginating Controls');
    }
}

exports.createControl = async function (entity) {
    var newControl = new NinioControl({
        ninioId: entity.id,
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
            id: savedControl.ninioId
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating NewControl")
    }
}

exports.updateControl = async function (entity) {
    var id = {ninioId: entity.id}
    try {
        //Find the old User Object by the Id
        var old = await NinioControl.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the NinioControl")
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
        throw Error("And Error occured while updating the NinioControl");
    }
}

exports.removeControl = async function (id) {
    try {
        var deleted = await NinioControl.remove({
            ninioId: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("NinioControl could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the NinioControl")
    }
}
