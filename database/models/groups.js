var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    groupId: String,
    topics: [String],
    platform: String,
});

module.exports = mongoose.model('groups', GroupSchema);