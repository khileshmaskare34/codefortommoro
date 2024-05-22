const nodemailer = require('nodemailer');
 
exports.sendMail = function(req, res, email, otpCode){

let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            host: 'smtp.gamil.com',
            auth: {
                user: 'khileshnature28@gmail.com',
                pass: 'mqfgkmgvvwhmrawu'
            }
        }
    );
 
let mailDetails = {
    from: 'khileshnature28@gmail.com',
    to: email,
    subject: 'Test mail',
    text: `opt code ${otpCode}`
};
 
mailTransporter
    .sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });



}
