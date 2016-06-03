(function(){

    var getMethod = require('../../config/getGlobalMethod');

    var FcmManager = function(config , tnxId) {
        this.config = config;
        this.tnxId = tnxId;
        var methodName = getMethod.FileName;
        this.fcmPush = getMethod(methodName.fcmPush);
    };

    FcmManager.prototype = {
        sendFcmNotification: function(commandObj, callback){
            this.callback = callback;
            this.commandObj = commandObj;

            var fcm = new this.fcmPush(this.config.fcmServerKey);
            var message = {
                to: this.commandObj.registrationId, // required
                /*collapse_key: 'your_collapse_key',
                data: {
                    your_custom_data_key: 'your_custom_data_value'
                },*/
                notification: this.commandObj.notificationMessage
            };

            var resHandle = this.fcmServerResponse.bind(this);
            if(this.commandObj.notificationActive) fcm.send(message, resHandle);
        },
        fcmServerResponse: function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        }
    };

    module.exports = function(config , tnxId){
        return (new FcmManager(config , tnxId));
    };
})();