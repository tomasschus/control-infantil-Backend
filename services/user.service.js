// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    try {
        console.log("Query",query)
        var Users = await User.paginate(query, options)
        return Users;
    } catch (e) {
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.getUserByEmail = async function (mail) {

    // Try Catch the awaited promise to handle the error 
    try {
        var UserToFind = await User.findOne({email: mail})
        console.log(UserToFind)
        // Return the Userd list that was retured by the mongoose promise
        return UserToFind;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.createUser = async function (user) {
    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne({email: user.email})
    } catch (e) {
        throw Error("Error occured while logging the User")
    }
    // If no old User Object exists return false
    console.log("RESP: ",oldUser)
    if (oldUser) {
        return false;
    }
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var newUser = new User({
        name: user.name,
        surname: user.surname,
        email: user.email,
        dni:user.dni,
        date: new Date(),
        password: hashedPassword,
        telephone: user.telephone
    })
    try {
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.logUser = async function (user) {
    try {
        var loginUser = await this.getUserByEmail(user.email)
        if (loginUser != null) {
            if (bcrypt.compareSync(user.password, loginUser.password)) {
                return jwt.sign({
                    id: loginUser._id
                }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
            }
            else{
                return null
            }
        }
        return null
    } catch (e) {
        throw Error("Error Occured while Trying to Login")
    }
}

exports.updateUser = async function (user) {
    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne({email: user.email})
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.name = user.name
    oldUser.surname = user.surname
    oldUser.telephone = user.telephone
    //oldUser.email = user.email
    oldUser.password = hashedPassword
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}
