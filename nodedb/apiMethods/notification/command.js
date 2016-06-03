(function(){

    var getMethod = require('../../config/getGlobalMethod');

    var CommandMethods = function() {
        var methodName = getMethod.FileName;
        this.mongoModel = getMethod(methodName.mongoModel);
    };

    CommandMethods.prototype = {
        addNotificationSettings: function(commandObj, callback){
            this.callback = callback;
            this.commandObj = commandObj;

            var query = { externalId: this.commandObj.externalId };
            this.mongoModel.Notification.update(query , { $set: this.commandObj }, { upsert: true} ,function(err , doc){
                callback(null , {message: 'Notification Settings updated'})
            });
        },
        updateNotificationSettings: function(commandObj, callback){
            this.callback = callback;
            this.commandObj = commandObj;

            var query = { externalId: this.commandObj.externalId };
            this.mongoModel.Notification.update(query , { $set: this.commandObj }, { upsert: true} ,function(err , doc){
                callback(null , {message: 'Notification Settings updated'})
            });
        }
    };

    module.exports = CommandMethods;
})();