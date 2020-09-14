var mongoose = require('mongoose');

var SourceSchema = new mongoose.Schema({
    feedId: String,
    subscribers: Number,
    title: String,
    description: String,
    website: String,
    lastUpdated: Date,
    velocity: Number,
    language: String,
    featured: Boolean,
    iconUrl: String,
    visualUrl: String,
    coverUrl: String,
    logo: String,
    contentType: String,
    coverColor: String,
});

var TopicSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    sources: [SourceSchema]
});

module.exports = mongoose.model('topics', TopicSchema);