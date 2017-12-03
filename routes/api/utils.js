var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

//SEND MAIL
router.get('/sendmail', function(req, res) {
  let transporter = nodemailer.createTransport('smtps://tigerliliesnp@gmail.com:thel1lies@smtp.gmail.com');
  let mailData = {
    from: 'lukitos200@gmail.com',
    to: 'sue.travelagent@yahoo.com',
    subject: 'Mentor matching app',
    text: 'Hello world',
    html: '<b>Hello world</b>'
  };
  transporter.sendMail(mailData, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    console.log('status:', status);
  });
  res.send({ success: 1 });
})

module.exports = router;
