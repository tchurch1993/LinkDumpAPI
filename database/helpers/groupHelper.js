const GroupModel = require('./../models/groups');

class Group {
    static getGroup(groupId, callback){
        GroupModel.findOne('groupId').equals(groupId)
    }

    static getGroupTopics(groupId, callback){

    }
}