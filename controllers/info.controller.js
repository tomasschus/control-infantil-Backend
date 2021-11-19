var InfoService = require('../services/info.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getInfo = async function (req, res, next) {
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = {type: req.query.type}
    try {
        var Info = await InfoService.getInfo(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Info, message: "Succesfully Info Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createInfo = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Info = {
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        button: req.body.button
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdInfo = await InfoService.createInfo(Info)
        return res.status(201).json({createdInfo, message: "Succesfully Created Info"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Info Creation was Unsuccesfull"})
    }
}

exports.removeInfo = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await InfoService.deleteInfo(id);
        res.status(200).send("Succesfully Info Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
