var express = require('express')
var router = express.Router()

var ChildController = require('../../controllers/children.controller');
var VaccineController = require('../../controllers/vaccine.controller');
var ControlController = require('../../controllers/control.controller');
var UploadController = require('../../controllers/upload.controller');
var Authorization = require('../../auth/authorization');
//TODO
/*var PercentilController = require('../../controllers/percentil.controller');
var RecipeController = require('../../controllers/recipe.controller');*/

// Authorize each API with middleware and map to the Controller Functions
router.get('/test', function(req, res, next) {
  res.send('Llegaste a la ruta de  api/child.route');
});
//Children
router.post('/create', ChildController.createChild)
router.get('/', Authorization, ChildController.getChildren)
router.post('/childrenByEmail', Authorization, ChildController.getChildrenByEmail)
router.put('/', Authorization, ChildController.updateChild)
router.delete('/:id', Authorization, ChildController.removeChild)
//Others
router.post('/saveImgChild', ChildController.saveImageChild)
router.post('/uploadImg', UploadController.uploadFilesImgUser);
router.post('/imgChildById', Authorization,ChildController.getImagenUserById)
//Vaccines
router.get('/vaccines', Authorization, VaccineController.getVaccinesByChild)
router.post('/vaccine/create', Authorization, VaccineController.createVaccine)
router.put('/vaccine', Authorization, VaccineController.updateVaccine)
router.delete('/vaccine/:id', Authorization, VaccineController.removeVaccine)
//Controls
router.get('/controls', Authorization, ControlController.getControlsByChild)
router.post('/control/create', Authorization, ControlController.createControl)
router.put('/control', Authorization, ControlController.updateControl)
router.delete('/control/:id', Authorization, ControlController.removeControl)

//TODO
//Percentils
/*router.get('/percentils', Authorization, PercentilController.getPercentilsByChild)
router.post('/percentil/create', Authorization, PercentilController.createPercentil)
//Recipes
router.get('/recipes', Authorization, PercentilController.getRecipesByChild)
router.post('/recipe/create', Authorization, PercentilController.createRecipe)
router.delete('/recipe/:id', Authorization, PercentilController.removeRecipe)*/

// Export the Router
module.exports = router;
