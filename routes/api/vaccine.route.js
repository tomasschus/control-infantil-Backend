var express = require('express')
var router = express.Router()

var VaccineController = require('../../controllers/vaccine.controller');
var Authorization = require('../../auth/authorization');

// Authorize each API with middleware and map to the Controller Functions
router.get('/test', function(req, res, next) {
  res.send('Llegaste a la ruta de api/vaccine.route');
});

//Vaccines
router.get('/', Authorization, VaccineController.getVaccinesByChild)
router.post('/', Authorization, VaccineController.createVaccine)
router.put('/', Authorization, VaccineController.updateVaccine)
router.delete('/:id', Authorization, VaccineController.removeVaccine)

// Export the Router
module.exports = router;
