const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/joinUs', (req, res) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    const payload = {
        to: "lmorgans90@gmail.com",
        from: req.body.emailAddress,
        subject: `RECRUITMENT: ${req.body.category} position.`,
        text: `Hi,
         I would like to join as a ${req.body.category}!, please can you contact me back at ${req.body.emailAddress}.`
    }

    sgMail.send(payload)
        .catch(error => {
            console.log('Error in sending email')
        })
})


// set static folder
app.use(express.static(__dirname + '/dist'));

//catch all routes and send to Angular Router.
app.get('*/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

// Set listening port
const port = process.env.PORT || 1337
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})
