// Gettign the Newly created Mongoose Model we just created 
var NinioControlVaccine = require('../models/NinioControlVaccine.model');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getVaccines = async function (query, page, limit) {
    var options = {
        page,
        limit
    }
    try {
        console.log("Query",query)
        var Vaccines = await NinioControlVaccine.paginate(query, options)
        return Vaccines;

    } catch (e) {
        console.log("error services",e)
        throw Error('Error while Paginating Vaccines');
    }
}

exports.createVaccine = async function (entity) {
    var newVaccine = new User({
        ninioId: entity.id,
        vaccineId: entity.vaccine.id,
        notes: entity.vaccine.notes,
        date: new Date()
    })
    try {
        // Saving the User 
        var savedVaccine = await newVaccine.save();
        var token = jwt.sign({
            id: savedVaccine.vaccineId
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Vaccine")
    }
}

exports.updateVaccine = async function (entity) {
    var id = {ninioId: entity.id, vaccineId: entity.vaccineId}
    try {
        //Find the old User Object by the Id
        var old = await NinioControlVaccine.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the NinioControlVaccine")
    }
    // If no old Object exists return false
    if (!old) {
        return false;
    }
    //Edit the User Object
    old.date = new Date()
    old.notes = entity.notes
    try {
        var savedOne = await old.save()
        return savedOne;
    } catch (e) {
        throw Error("And Error occured while updating the NinioControlVaccine");
    }
}

exports.deleteVaccine = async function (id) {
    try {
        var deleted = await NinioControlVaccine.remove({
            ninioId: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("NinioControl could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the NinioControlVaccine")
    }
}
