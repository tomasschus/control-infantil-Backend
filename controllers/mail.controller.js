let nodemailer = require('nodemailer');


exports.sendEmail = async function (req, res, next){
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'andrev.rojas.93@gmail.com',//TODO: remove
            pass: 'Analytics@2021'//TODO: remove - contraseña cuenta  IMPORTANTE HABILITAR acceso apps poco seguras google
        }
     });
    // Definimos el email
    var mailOptions = {
        from: 'andrev.rojas.93@gmail.com',//TODO: remove
        to: req.body.receiver,
        subject: req.body.subject,
        html: '<h1> DigiControl.com </h1>'
            + '<br/>'
            + '<h3> Confirmación de su cuenta en nuestra plataforma: </h3>'
            + '<br/>'
            + 'Usuario: <b>' + req.body.username + '</b> <br/>'
            + 'Correo electrónico: <b>' + req.body.email + '</b> <br/>'
            + '<br/>'
            + '<p>Que tengas un buen dìa! :)</p>'
    };
    try
    {
        let info = await transporter.sendMail(mailOptions);
        return res.status(200).json({status: 200, data: info.messageId, message: "Succesfully Message sent"});
    }catch(error){
        console.log("Error envio mail: ",error);            
    }
};
