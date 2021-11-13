var express = require('express')
var router = express.Router()

var ControlController = require('../../controllers/control.controller');
var Authorization = require('../../auth/authorization');

// Authorize each API with middleware and map to the Controller Functions
router.get('/test', function(req, res, next) {
  res.send('Llegaste a la ruta de  api/control.route');
});

//Controls
router.get('/', Authorization, ControlController.getControls)
router.post('/', Authorization, ControlController.createControl)
router.post('/find', Authorization, ControlController.getControlsById)
router.put('/', Authorization, ControlController.updateControl)
router.delete('/:id', Authorization, ControlController.removeControl)

// Export the Router
module.exports = router;
