var express = require('express');
var mailgun = require('mailgun.js');
var config = require('../../config');

// Initialize
let router = express.Router();
let { MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  MAILGUN_SENDER } = config;
let mg = mailgun.client({
  username: 'api',
  key: MAILGUN_API_KEY
});

// Send mail using Mailgun
router.post('/send', function (req, res) {
  let { to, subject, text, html } = req.body;
  mg.messages.create(MAILGUN_DOMAIN, {
    from: MAILGUN_SENDER,
    to,
    subject,
    text,
    html
  })
  .then(msg => res.send(msg))
  .catch(err => res.send(err));
});

module.exports = router;
