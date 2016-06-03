(function(){

    var getMethod = require('../config/getGlobalMethod');

    var dummy = require('../api/dummy');

    var directResponse = require('../api/directResponseApi');

    var parseBody = require('../api/parseBodyApi');

    var parseRequest = require('../api/parseRequestApi');

    var routes = [
        {
            apiName             : 'dummy',
            apiType             : 'Command',
            apiHandler          : dummy.dummyApi,
            apiRedirect         : '',
            moduleName          : '',
            inSession           : false,
            contentType         : 'application/json'
        },
        {
            apiName             : 'configureNotifier',
            apiType             : 'Command',
            apiHandler          : parseBody.parseBodyApi,
            apiRedirect         : 'addNotificationSettings',
            moduleName          : getMethod.FileName.notification,
            inSession           : false,
            contentType         : 'application/json'
        },
        {
            apiName             : 'updateNotifier',
            apiType             : 'Command',
            apiHandler          : parseBody.parseBodyApi,
            apiRedirect         : 'updateNotificationSettings',
            moduleName          : getMethod.FileName.notification,
            inSession           : false,
            contentType         : 'application/json'
        }
    ];

    module.exports.routeConfig = function(){
        return routes;
    };

    module.exports.routeList = function(){
        var apiCall = {};
        for(var i = 0; i < routes.length; i++){
            apiCall[routes[i].apiName] = routes[i].apiName;
        }
        return apiCall;
    };
})();