var express = require('express')
var router = express.Router()
var MailController = require('../../controllers/notification.controller');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de api/notification.route');
  });
router.post('/send', MailController.sendEmail)


// Export the Router
module.exports = router;
