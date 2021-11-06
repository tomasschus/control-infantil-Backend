// Gettign the Newly created Mongoose Model we just created 
var NinioImg = require('../models/NinioImg.model');

// Saving the context of this module inside the _the variable
_this = this

//configurar cloudinary
var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'sarasapaula', //reemplazar con sus credenciales
    api_key: '827784374844765', 
    api_secret: 'EfhdI2XXe-jM6JzOKaIX8FEDTDY'
});

// Async function to get the Contact List
exports.getImages = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Imagenes = await NinioImg.paginate(query, options)
        // Return the Contact list that was retured by the mongoose promise
        return Imagenes;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Images');
    }
}

// Async function to get the Contact List
exports.getImagesByChild = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    console.log("byId",query)
    try {
        var ChildImg = await NinioImg.paginate(query, options)
        console.log("Images by Id",ChildImg)
        return ChildImg;
    } catch (e) {
        throw Error('Error while Paginating Images');
    }
}

async function saveChildImg (newUserImg) {
    try {
        // Saving the Control 
        var saveChildImg = await newUserImg.save();
        
        return saveChildImg;
    } catch (e) {
        // return a Error message describing the reason 
    console.log(e)    
    throw Error("Error while Creating Imagen User")
    }
}

exports.createChildImg = async function (entity) {
    //subir imagen a cloudinary
    console.log("ChildImg",entity)
    let urlImg;
    let imagen = process.env.UPLOAD_DIR + entity.imageName;
    cloudinary.uploader.upload(imagen, function(result) { 
        console.log("Resultado",result);
        //urlImg=result.url;
        // Creating a new Mongoose Object by using the new keyword
        var newChildImg = new UserImg({      
            id: entity.id,
            date: new Date(),
            imageName: result.url
        })
        saveChildImg(newChildImg);
    });
}
