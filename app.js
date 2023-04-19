const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const submissions = [];

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended:false}) )

app.get('/', serveIndex);

function serveIndex(request, response){
    response.sendFile('index.html', {root: __dirname});
}

app.get('/contact.html', serveContact);

function serveContact(request, response){
    response.sendFile('contact.html', {root: __dirname});
}

app.post('/contact/send', contactHandler);

function contactHandler(request, response){
    submissions.push(request.body);
    response.redirect('/');
}

app.get('/submissions', serveSubmissions);

function serveSubmissions(request, response){
    response.json(submissions);
}

app.listen(port);
console.log(`Server is running on port ${port}...`);

