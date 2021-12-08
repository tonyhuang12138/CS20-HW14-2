const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://tonyhuang12138:Tony123456@cluster0.ypk43.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

// Establish connection
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {

    if (err) { return console.log(err); }
    // ASYNC FUNCTION?
    var dbo = db.db("database");
    var collection = dbo.collection('companies');

    app.post('/', async (req, res) => {
        var typeResult = String(req.body.type);
        var searchResult = String(req.body.search);
        if (typeResult == 'ticker') {
            const result = await collection.findOne({ Company: searchResult });
            res.send(result.Company + " : " + result.Ticker);
        } else { // == 'company'
            const result = await collection.find({ Ticker: searchResult }).toArray();
            // console.log(result);
            res.writeHead(200, { "Content-Type": "text/html" });
            for (i = 0; i < result.length; i++) {
                res.write(result[i].Company + " : " + result[i].Ticker + "<br>");
            }
        }
    });

});

app.listen(port, function () {
    console.log('listening on port');
})