var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var UploadController = require('../../controllers/upload.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/', UserController.createUser)
router.get('/',Authorization, UserController.getUsers)
router.put('/', Authorization, UserController.updateUser)
router.delete('/:id', Authorization, UserController.removeUser)
router.post('/login', UserController.loginUser)
router.post('/logout', UserController.logoutUser)
router.post('/find', Authorization, UserController.getUsersByMail)
router.post('/email',MailController.sendEmail)
router.post('/guardarImgUser',UserController.guardarImagenUser)
router.post('/uploadImg',UploadController.uploadFilesImgUser);
router.post('/imgUserByMail',Authorization,UserController.getImagenUserByMail)


// Export the Router
module.exports = router;
