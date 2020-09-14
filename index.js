const express = require('express');
const mongoose = require('mongoose');
const topic = require('./database/helpers/topicHelper.js')
const fetch = require('node-fetch');
const config = require('./config.json');


var app = express();
const port = 3000;

mongoose.connect(config.mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;


// DB event handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("db connected: " + db.name)
});


// Express event handling
app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/search', (req, res) => {
    topic.getTopic(req.query.keyword, doc => {
        if (doc) {
            res.send(doc)
        } else {
            fetch(config.feedlyAPI + req.query.keyword, {
                    method: "GET"
                })
                .then(fetchRes => fetchRes.json())
                .then(json => {
                    topic.addTopic(req.query.keyword, json.results, doc => {
                        res.send(doc)
                    });
                });
        }
    })


});

app.get('/getTopic', (req, res) => {
    topic.getTopic(req.query.keyword, (doc) => {
        res.send(doc);
    });
});

app.get('/getGroup', (req, res) => {
    res.send('hello world');
});






app.listen(port, () => console.log('listening on port ' + port))