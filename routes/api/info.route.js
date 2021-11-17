var express = require('express')
var router = express.Router()
var InfoController = require('../../controllers/info.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de api/info.route');
  });
router.post('/', InfoController.createInfo)
router.get('/', InfoController.getInfo)
router.delete('/:id', Authorization, InfoController.removeInfo)


// Export the Router
module.exports = router;
