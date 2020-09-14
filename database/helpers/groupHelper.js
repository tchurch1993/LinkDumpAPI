const GroupModel = require('../models/groups');

module.exports = class Group {
    static getGroup(groupId, platform, callback) {
        try {
            GroupModel.findOne()
                .where('groupId').equals(groupId)
                .where('platform').equals(platform)
                .then(doc => {
                    if (doc)
                        return callback(doc);
                    return callback(undefined);
                })
        } catch (err) {
            console.error(err);
            return callback(undefined);
        }

    }

    static getGroupTopics(groupId, platform, callback) {
        try {
            GroupModel.findOne()
                .where('groupId').equals(groupId)
                .where('platform').equals(platform)
                .then(doc => {
                    if (doc)
                        return callback(doc.topics);
                    return callback(undefined);
                })
        } catch (err) {
            console.error(err);
            return callback(undefined);
        }

    }

    static addGroup(groupId, platform, callback) {
        var newGroup = new GroupModel({
            groupId: groupId,
            platform: platform
        })
        newGroup.save(err => {
            if (err) {
                console.error(err);
                return callback(undefined);
            } else {
                return callback(newGroup);
            }
        })
    }

    static addTopicToGroup(groupId, platform, topic, callback) {
        this.getGroup(groupId, platform, doc => {
            doc.topics.push(topic);
            doc.save(err => {
                if (err) {
                    console.error(err);
                    return callback(undefined);
                } else {
                    return callback(doc);
                }
            })
        })
    }
}