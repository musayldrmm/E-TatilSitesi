const express = require('express');
const router=express.Router();
const User = require('../models/user');

router.get('/',function(req, res){
    User.findById(req.session.userId).then(account=>{
        res.render("index/contactus",{account:account});
    })
})
router.post('/email',function(req, res){
    const outputHTML = `
    <h2>Mail details</h2>
    <ul>
        <li>Name: ${req.body.name} </li>
        <li>Name: ${req.body.email} </li>
        <li>Name: ${req.body.phone} </li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message} </p>`
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 465,
secure: true, // true for 465, false for other ports
auth: {
user:'turehberim76@gmail.com', // generated ethereal user
pass: 'xpzbxruviuoaveuf'
},
});
//@sssdeqwee.444
// send mail with defined transport object
let info = await transporter.sendMail({
from: '"node proje contact form" < turehberim76@gmail.com>', // sender address
to: "turehberim76@gmail.com", // list of receivers
subject: "node contact", // Subject line
text: "Hello world?", // plain text body
html: outputHTML, // html body
});

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

res.redirect("/")
}

main().catch(console.error);
})
module.exports=router;