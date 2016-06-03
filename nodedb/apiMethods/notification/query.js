(function(){

    var getMethod = require('../../config/getGlobalMethod');

    var methodName = getMethod.FileName;

    var QueryMethods = function QueryMethods(){
    };

    QueryMethods.prototype = {
        listConfiguredNotifiers: function(queryObj, callback){
            this.callback = callback;
            this.queryObj = queryObj;

            var query = { "notificationActive" : true };
            var resHandle = this.processRegisteredNotifiers.bind(this);
            this.defaultFindMethod(query, resHandle);
        },
        processRegisteredNotifiers: function(err, result){
            var processHandler = this.queryObj.processHandler;
            if(!result) result = [];

            for(var i = 0; i < result.length; i++){
                var handler = getMethod(methodName[processHandler])(this.config, this.tnxId);
                var resHandle = this.defaultDoNothing.bind(this);
                handler.runWebServer(result[i], resHandle);
            }
        }
    };

    module.exports = QueryMethods;
})();