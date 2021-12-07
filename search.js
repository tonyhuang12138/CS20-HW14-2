const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://tonyhuang12138:Tony123456@cluster0.ypk43.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ 
//     extended: true })
// );

app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/search', function (req, res) {
    console.log("HI");
    var ticker = String(req.body.type);
    var company = String(req.body.company);
});

app.listen(port, function () {
    console.log('listening on port')
})