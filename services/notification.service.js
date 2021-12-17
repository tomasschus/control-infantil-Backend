let nodemailer = require('nodemailer');
var UserService = require('./user.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.sendEmail = async function (entity){
    try {
        var user = await UserService.getUserByEmail(entity.email)
        if (!user) {
            console.log("getUserByEmail method - error during get user by email")
        }

        if (entity.action === "password") {
            user.password = entity.password;
        }

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
    let password;

    if(action === "reset") {
        password = await UserService.resetPassword(entity.user)
        if (password === null) {
            console.log("resetPassword method - error during reset password")
            return false;
        }
    }

    if(action === "password") {
        password = await UserService.changePassword(entity.user)
        if (password === null) {
            console.log("changePassword method - error during change password")
            return false;
        }
    }

    switch(action){
        case "create":
            _subject = 'DigiControl.com - Te queremos dar la bienvenida <3';
            _message = 'Estimad@ ' + entity.user.surname + ', ' + entity.user.name + ', <br/><br/>Le queremos dar la bienvenida :D <br/>';
            _content = 'Estos son sus datos de acceso a nuestra plataforma.<br/><br/>'
                + (entity.user.dni ? '<b>DNI:</b> ' + entity.user.dni + '<br/>' : '')
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
        case "reset":
            _subject = 'DigiControl.com - Restablecer contraseña de su cuenta';
            _message = 'Estimad@ ' + entity.user.surname + ', ' + entity.user.name + ', <br/><br/>Su contraseña se ha restaurado a petición suya :) <br/> Su contraseña provisoria es: <b>' + password + '</b><br/><br/>';
            _content = 'Si no fue usted, le aconsejamos que ingrese a su cuenta y cambie su contraseña personal.<br/>'
            byebye = '<br/><p>Nunca te vamos a pedir tus credenciales! ^^</p>'
            break;
        case "password":
            _subject = 'DigiControl.com - Cambio de contraseña';
            _message = 'Estimad@ ' + entity.user.surname + ', ' + entity.user.name + ', <br/><br/>Su contraseña se ha actualizado a petición suya ;) <br/><br/>';
            //<br/> Su contraseña provisoria es: <b>' + password + '</b><br/><br/>
            _content = 'Recuerda que tienes la opción de restaurar tu contraseña cuando quieras :P<br/>'
            byebye = '<br/><a href="https://children.herokuapp.com/">Ir a DigiControl.com</a><br/><br/><p>Que tengas un buen día! :)</p>';
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
    try {
        let info = await transporter.sendMail(mailOptions);
        return info;
    }catch(error){
        console.log("Error envio mail: ",error);
    }
}
