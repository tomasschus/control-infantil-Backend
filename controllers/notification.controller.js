var MailService = require('../services/notification.service');

exports.sendEmail = async function (req, res, next){
    const email = req.body.email;
    const action = req.body.action;
    if (!email) {
        return res.status(400).json({status: 400, message: "E-mail is required"})
    }else if (!action) {
        return res.status(400).json({status: 400, message: "Action is required"})
    }
    try {
        var Notification = await MailService.sendEmail(req.body)
        return res.status(200).json({status: 200, data: Notification, message: "Succesfully Notification sent"});
    } catch (e) {
        throw Error("Error Occured while Trying to Notify User")
    }
};
