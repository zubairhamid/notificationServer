(function(){

    var interactor = require('@cloudmpower/interactor');

    var loadOtherModules = function(){

        var errorResponse = require('../gen/errorResponse');

        var successResponse = require('../gen/successResponse');

        var mongoModel = require('../databases/dbModel/models');

        //var session = require('@cloudmpower/session');

        var webServer = require('../saasGateway/wsMethods');

        var notification = require('../apiMethods/notification/notificationMethods');

        var iDidItNotice = require('../apiMethods/iDidItNotice/iDidItNoticeMethods');

        var fcmPush = require('fcm-push');

        var referenceObj = [
            {
                fileName        : 'mongoModel',
                fileObj         : mongoModel
            },
            {
                fileName        : 'errorResponse',
                fileObj         : errorResponse
            },
            {
                fileName        : 'successResponse',
                fileObj         : successResponse
            },
            {
                fileName        : 'webServer',
                fileObj         : webServer
            },
            {
                fileName        : 'notification',
                fileObj         : notification
            },
            {
                fileName        : 'fcmPush',
                fileObj         : fcmPush
            },
            {
                fileName        : 'iDidItNotice',
                fileObj         : iDidItNotice
            }
        ];
        interactor.requireHandler(referenceObj);
    };

    module.exports = interactor;

    module.exports.FileName = interactor.fileName();

    loadOtherModules();
})();