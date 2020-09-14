var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    groupId: String,
    topics: [{
        topic: string
    }],
    platform: String,
});