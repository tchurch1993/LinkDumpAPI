const express = require('express');
const mongoose = require('mongoose');
const Topic = require('./database/helpers/topicHelper.js')
const Group = require('./database/helpers/groupHelper');
const rssHelper = require('./RSS/rssHelper');
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
    res.send('what it do fam.');
});

app.post('/search', (req, res) => {
    Topic.getSources(req.query.keyword, doc => {
        if (doc) {
            res.send(doc)
        } else {
            fetch(config.feedlyAPI + req.query.keyword, {
                    method: "GET"
                })
                .then(fetchRes => fetchRes.json())
                .then(json => {
                    Topic.addTopic(req.query.keyword, json.results, doc => {
                        res.send(doc)
                    });
                });
        }
    })


});

app.get('/getSources', (req, res) => {
    Topic.getSources(req.query.keyword, (doc) => {
        res.send(doc);
    });
});

app.get('/getGroup', (req, res) => {
    Group.getGroup(req.query.groupId, req.query.platform, doc => {
        if (doc)
            res.send(doc);
        else
            res.send(undefined);
    })
});

app.post('/addGroup', (req, res) => {
    var groupId = req.query.groupId;
    var platform = req.query.platform;

    Group.getGroup(groupId, platform, doc => {
        if (doc) {
            res.send("group already exists");
        } else {
            Group.addGroup(groupId, platform, doc => {
                if (doc) {
                    res.send(doc);
                } else {
                    res.send("could not create group");
                }
            })
        }
    })

})

app.post('/addTopic', (req, res) => {
    var groupId = req.query.groupId;
    var platform = req.query.platform;
    var newTopic = req.query.keyword;

    Group.getGroupTopics(groupId, platform, doc => {
        if (doc) {
            var isAlreadyAdded = doc.find(topic => topic == newTopic);

            if (isAlreadyAdded) {
                res.send("Topic already Added");
            } else {
                Group.addTopicToGroup(groupId, platform, newTopic, doc => {
                    if (doc) {
                        res.send(doc);
                    } else {
                        res.send("could not add topic");
                    }
                })
            }
        }
    })

})

app.get('/getGroupArticle', (req, res) => {
    var groupId = req.query.groupId;
    var platform = req.query.platform;

    Group.getGroupTopics(groupId, platform, doc => {
        if (doc) {
            var size = doc.length;
            var randoNum = Math.floor(Math.random() * size);

            var topic = doc[randoNum];

            Topic.getSources(topic, doc => {
                var source = doc.sources[0];
                var feedUrl = source.feedId.replace('feed/','');
                console.log(feedUrl);
                rssHelper(source.feedId)
                res.send('yuh')
            })
        }
    })
})






app.listen(port, () => console.log('listening on port ' + port))