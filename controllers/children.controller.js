var ChildrenService = require('../services/child.service');
var ChildImgService =require('../services/childImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getChildren = async function (req, res, next) {
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Children = await ChildrenService.getAllChildren({}, page, limit)
        return res.status(200).json({status: 200, data: Children, message: "Succesfully Children Received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getChildrenByEmail = async function (req, res, next) {
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = {email: req.body.email}
    try {
        var Children = await ChildrenService.getChildren(filtro.email, page, limit)
        return res.status(200).json({status: 200, data: Children, message: "Succesfully Children Received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createChild = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Entity = {
        email: req.body.email,
        child: {
            name: req.body.name,
            surname: req.body.surname,
            img: req.body.img,
            gender: req.body.gender,
            birthday: req.body.birthday,
            bloodType: req.body.bloodType,
            notes: req.body.notes
        }
    }
    try {
        var createdChild = await ChildrenService.createChild(Entity)
        return res.status(200).json({createdChild, message: "Succesfully Created Child"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Child Creation was Unsuccesfull"})
    }
}

exports.updateChild = async function (req, res, next) {
    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(404).json({status: 404, message: "id be present"})
    }
    var Entity = {
        email: req.body.email,
        child: {
            _id: req.body._id ? req.body._id : null,
            name: req.body.name ? req.body.name : null,
            surname: req.body.surname ? req.body.surname : null,
            img: req.body.imgName ? req.body.img : null,
            gender: req.body.gender ? req.body.gender : null,
            birthday: req.body.birthday ? req.body.birthday : null,
            bloodType: req.body.bloodType ? req.body.bloodType : null,
            notes: req.body.notes ? req.body.notes : null
        }
    }
    try {
        var updatedChild = await ChildrenService.updateChild(Entity)
        return res.status(200).json({status: 200, data: updatedChild, message: "Succesfully Updated Child"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeChild = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await ChildrenService.deleteChild(id);
        res.status(200).send("Child Succesfully Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
//TODO
exports.saveImageChild = async function (req, res, next) {
    console.log("ImgUser",req.body)
    // Id is necessary for the update
    if (!req.body.id) {
        return res.status(400).json({status: 400, message: "Id must be present"})
    }
    let childImg = {
        id: req.body.id,
        imageName : req.body.imageName
    }
    try {
        if (childImg.imageName !== '') {
            var newUserImg = await ChildImgService.createChildImg(childImg);
        }
        return res.status(201).json({status: 201, message: "Imagen cargada"});
        
    } catch (e) {
        console.log("error guardar imagen",e)
        return res.status(400).json({status: 400, message: e.message})
    }
}
//TODO
exports.getImagenUserById = async function (req, res, next) {
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    //obtener filtro
    var filtro = {
        id: req.body.id
    }
    try {
        var ChildImg = await ChildImgService.getImagesByChild(filtro, page, limit)
        console.log("ChildImgById",ChildImg)
        if (ChildImg.total===0)
            return res.status(201).json({status: 201, data: ChildImg, message: "No existe Id"});
        else
            return res.status(200).json({status: 200, data: ChildImg, message: "Succesfully ChildImg Recieved"});
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: e.message});
    }
}
