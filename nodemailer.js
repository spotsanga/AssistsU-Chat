var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: false,
    auth: {
        user: 'johnpavis30@gmail.com',
        pass: 'Iampavis_6'
    }
});
console.log('Mail Server connection requested');
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Mail Server is ready to take our messages');
    }
});
module.exports.sendmail = function (to, subject, html) {
    var mailOptions = {
        to: to,
        subject: subject,
        html: html,
    };
    console.log('Sending email')
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}