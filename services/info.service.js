// Gettign the Newly created Mongoose Model we just created 
var Info = require('../models/Info.model');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getInfo = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    try {
        console.log("Query",query)
        var InfoRes = await Info.paginate(query, options)
        return InfoRes;
    } catch (e) {
        console.log("error services",e)
        throw Error('Error while Paginating Info');
    }
}

exports.createInfo = async function (info) {
    // Creating a new Mongoose Object by using the new keyword
    var newInfo = new Info({
        type: info.type,
        title: info.title,
        description: info.description,
        imgUrl: info.imgUrl,
        button: info.button,
        date: new Date()
    })
    try {
        // Saving the User 
        var savedInfo = await newInfo.save();
        var token = jwt.sign({
            id: savedInfo._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Info")
    }
}

exports.deleteInfo = async function (id) {
    try {
        var deleted = await Info.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Info Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting Info")
    }
}
