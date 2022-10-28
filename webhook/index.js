'use strict'

const authToken = 'token666';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
var nodemailer = require('nodemailer');
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Servicio en el puerto ${port}`)
})

app.get('/webhook', (req, res) => {
    res.sendStatus(200);
    var webhook = req.body;
    console.log(webhook);
})

app.post('/webhook', (req, res) => {
    var data = req.body;
    console.log('Inicio del Json');
    console.log(data);
    console.log('Fin del Json');

    res.sendStatus(200)
})

app.post('/sendMail', (req, res) => {
    var {mensaje, remitente, asunto, token} = req.body;

    if(token == authToken) {
        var transporter = nodemailer.createTransport({
            service: 'outlook',
    
            auth: {
              user: 'abbaagustin@outlook.com',
              pass: 'a3537669593'
            }
        });
    
        var mailOptions = {
            from: 'abbaagustin@outlook.com',
            to: remitente,
            subject: asunto,
            text: mensaje
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
        });
    
        var {mensaje, remitente, asunto} = req.body;
    } else {
        console.log('Error el token no es valido')
    }
})

