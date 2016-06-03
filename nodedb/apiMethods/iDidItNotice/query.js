(function(){

    var getMethod = require('../../config/getGlobalMethod');

    var QueryMethods = function QueryMethods(){
        var methodName = getMethod.FileName;
        this.webServer = getMethod(methodName.webServer);
        this.fcmPush = getMethod(methodName.fcmPush);
    };

    QueryMethods.prototype = {
        runWebServer: function(queryObj, callback){
            this.callback = callback;
            this.queryObj = queryObj;

            this.config.gatewayConfig = this.config.jollywellAdminServerConfig;
            this.config.gatewayConfig["path"] = "/admin/integrate/dummy";

            var resHandle = this.forwardToFcm.bind(this);

            var webServer = this.webServer(this.config, this.tnxId);
            webServer.gatewayHandler(this.queryObj, resHandle);
        },
        forwardToFcm: function(err, result){
            if(err){
                console.log('Server response failed with following error: ' , err);
            }else{
                var response = result.responseData.response;
                var fcmNotification = this.queryObj.fcmNotification;

                var fcmPush = this.fcmPush(this.config, this.tnxId);
                var resHandle = this.defaultDoNothing.bind(this);

                fcmNotification["notificationMessage"] = response.notificationMessage || { title: 'test the notifier',body: 'you have been warned' };
                //fcmPush.sendFcmNotification(fcmNotification, resHandle);
                console.log(fcmNotification);
            }
        }
    };

    module.exports = QueryMethods;
})();