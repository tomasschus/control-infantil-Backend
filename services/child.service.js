// Gettign the Newly created Mongoose Model we just created 
var Child = require('../models/Child.model');
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

exports.getAllChildren = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Users = await Child.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Children');
    }
}

exports.getChildren = async function (mail, page, limit) {
    // Try Catch the awaited promise to handle the error 
    try {
        var Children = await Child.find({emailUser: mail})
        // Return the Userd list that was retured by the mongoose promise
        return Children;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.createChild = async function (entity) {
    try {
        //Find the old User Object by the Id
        var user = await User.findOne({email: entity.email})
    } catch (e) {
        throw Error("Error occured while logging the User")
    }
    // If no old User Object exists return false
    console.log("RESP: ",user)
    if (!user) {
        return false;
    }
    var newChild = new Child({
        emailUser: user.email,
        name: entity.child.name,
        surname: entity.child.surname,
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
            id: savedChild._id
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
    try {
        //Find the old User Object by the Id
        var old = await Child.findById(entity.child._id);
        console.log(entity)
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    console.log("RESP: ", old)
    // If no old Object exists return false
    if (!old) {
        return "id object not fount";
    }
    //Edit the User Object
    old.name = entity.child.name
    old.surname = entity.child.surname
    old.imageName = entity.child.img
    old.gender = entity.child.gender
    old.birthday = entity.child.birthday
    old.bloodType = entity.child.bloodType
    old.notes = entity.child.notes
    console.log("RESP: ", old)
    try {
        var savedChild = await old.save()
        return savedChild;
    } catch (e) {
        throw Error("And Error occured while updating the Child");
    }
}

exports.deleteChild = async function (id) {
    try {
        var deleted = await Child.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Child Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Child")
    }
}
