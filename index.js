const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');


var app = express();
const port = 3000;

mongoose.connect(config.mongoDb, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;


// DB event handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    console.log("db connected: " + db.name)
});


// Express event handling
app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/search', (req,res) => {

});



app.listen(port, () => console.log('listening on port ' + port))