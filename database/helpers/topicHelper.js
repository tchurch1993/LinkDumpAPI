const TopicModel = require('../models/topics');

module.exports = class Topic {

        static addTopic(topicName, sourceList, callback) {
            try {
                    this.getTopic(topicName, doc => {
                        if(!doc){
                            var newTopic = new TopicModel({
                                topic: topicName,
                            })
                            sourceList.forEach(source => {
                                newTopic.sources.push(source);
                            });
                            newTopic.save((err) => {
                                if (err) {
                                    console.error(err);
                                    return callback(undefined);
                                } else {
                                    return callback(newTopic);
                                }
                            })
                        } else {
                            return callback(doc);
                        }
                    })


            } catch (err) {
                console.error(err)
            }
        }

        static getTopic(topicName, callback) {
            try {
                TopicModel.findOne()
                    .where("topic").equals(topicName)
                    .then((doc) => {
                        if (doc)
                            return callback(doc);
                        return callback(undefined);
                    })
            } catch (err) {
                console.error(err);
            }
        }
    }
    