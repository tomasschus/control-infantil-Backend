/**ROUTE USER APIs. */
var express = require('express')
var router = express.Router()

//Routers
var users = require('./api/user.route')
var children = require('./api/child.route')
var controls = require('./api/control.route')
var info = require('./api/info.route')
var percentils = require('./api/percentil.route')
var calendar = require('./api/calendar.route')

//Mapping
router.use('/users', users);
router.use('/children', children);
//router.use('/controls', controls);
router.use('/info', info);
//router.use('/percentils', percentils);
router.use('/calendar', calendar);

module.exports = router;
