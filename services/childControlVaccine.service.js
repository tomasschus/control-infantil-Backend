// Gettign the Newly created Mongoose Model we just created 
var NinioControlVaccine = require('../models/ChildControlVaccine.model');
var jwt = require('jsonwebtoken');
const Vaccine = require('../models/Vaccine.model');
const ChildControlVaccine = require('../models/ChildControlVaccine.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getVaccines = async function () {
    try {
        var Vaccines = await Vaccine.find()
        return Vaccines;

    } catch (e) {
        console.log("error services",e)
        throw Error('Error while Paginating Vaccines');
    }
}

exports.createVaccine = async function (entity) {
    var newVaccine = new Vaccine({
        name: entity.name,
        dosis: entity.dosis,
        x: entity.x,
        y: entity.y,
    })
    try {
        // Saving the vaccine 
        var savedVaccine = await newVaccine.save();
        
        return savedVaccine
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

exports.asociarVacunaNinio = async function(entity){
    var childControlVaccine = new ChildControlVaccine({
        childId: entity.childId,
        vaccineId: entity.vaccineId,
        date : entity.date
    })
    try {
        // Saving the vaccine 
        var savedChildControlVaccine= await childControlVaccine.save();
        
        return savedChildControlVaccine
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Vaccine")
    }
}

exports.getVacunaPorNinio = async function(vaccineId){
    try {
        var res = await ChildControlVaccine.find(vaccineId);
        return res
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Vaccine")
    }
}