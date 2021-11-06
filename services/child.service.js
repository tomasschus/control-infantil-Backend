// Gettign the Newly created Mongoose Model we just created 
var Ninio = require('../models/Ninio.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getChildren = async function (query, page, limit) {
    var options = {
        page,
        limit
    }
    try {
        console.log("Query",query)
        var Children = await Ninio.paginate(query, options)
        return Children;

    } catch (e) {
        console.log("error services",e)
        throw Error('Error while Paginating Children');
    }
}

exports.createChild = async function (entity) {
    var newChild = new User({
        emailUser: entity.email,
        name: entity.child.name,
        username: entity.child.username,
        imageName: entity.child.img,
        gender: entity.child.gender,
        birthday: entity.child.birthday,
        bloodType: entity.child.bloodType,
        notes: entity.child.notes,
        date: new Date()
    })

    try {
        var savedChild = await newChild.save();
        var token = jwt.sign({
            id: savedChild.ninioId
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Child")
    }
}

exports.updateChild = async function (entity) {
    var id = {ninioId: entity.id}
    try {
        //Find the old User Object by the Id
        var old = await Ninio.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old Object exists return false
    if (!old) {
        return false;
    }
    //Edit the User Object
    old.name = entity.child.name
    old.username = entity.child.username
    old.imageName = entity.child.imgName
    old.gender = entity.child.gender
    old.birthday = entity.child.birthday
    old.bloodType = entity.child.bloodType
    old.notes = entity.child.notes

    try {
        var savedChild = await old.save()
        return savedChild;
    } catch (e) {
        throw Error("And Error occured while updating the Child");
    }
}

exports.deleteChild = async function (id) {
    try {
        var deleted = await Ninio.remove({
            ninioId: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Child Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Child")
    }
}
