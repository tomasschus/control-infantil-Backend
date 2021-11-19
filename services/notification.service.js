let nodemailer = require('nodemailer');
var UserService = require('./user.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.sendEmail = async function (entity){
    try {
        var user = await UserService.getUserByEmail(entity.email)
        if (user != null) {
            var Body = {
                user: user,
                action: entity.action
            }
            this.notify(Body)
        }
    } catch (e) {
        throw Error("Error Occured while Trying to Get User by Email")
    }
};

exports.notify = async function (entity){
    // Definimos el transporter
    const action = entity.action;
    let _subject;
    let _message;
    let _content;
    let byebye;
    switch(action){
        case "create":
            _subject = 'DigiControl.com - Te queremos dar la bienvenida <3';
            _message = 'Estimad@ ' + entity.user.surname + ', ' + entity.user.name + ', <br/><br/>Le queremos dar la bienvenida :D <br/>';
            _content = 'Estos son sus datos de acceso a nuestra plataforma.<br/><br/>'
                + (entity.user?.dni ? '<b>DNI:</b> ' + entity.user.dni + '<br/>' : '')
                + '<b>Correo electrónico:</b> ' + entity.user.email + '<br/>'
                + '<b>Teléfono:</b> ' + entity.user.telephone + '<br/>';
            byebye = '<br/><a href="https://children.herokuapp.com/">Ir a DigiControl.com</a><br/><br/><p>Que tengas un buen día! :)</p>';
            break;
        case "delete":
            _subject = 'DigiControl.com - Desactivación de su cuenta';
            _message = 'Estimad@ ' + entity.user.surname + ', ' + entity.user.name + ', <br/><br/>Su cuenta ha sido desactivada a petición suya :( <br/><br/>';
            _content = 'Recuerde que puede reactivarla cuando lo desee.<br/>'
            byebye = '<br/><p>Esperamos que vuelvas pronto!!! :)</p>'
            break;
    }
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
        to: entity.user.email,
        subject: _subject,
        html: '<h1> DigiControl.com </h1><br/>'
            + _message
            + _content
            + byebye
    };
    try
    {
        let info = await transporter.sendMail(mailOptions);
        return info;
    }catch(error){
        console.log("Error envio mail: ",error);            
    }
}
