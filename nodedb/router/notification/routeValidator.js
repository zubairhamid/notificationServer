(function(){

    var validator = require('../requestObjectValidator');

    module.exports = {
        "/notification/integrate/dummy": {
            "request": {
                "method"                            : "POST"
            }
        },
        "/notification/setting/add": {
            "request": {
                "method"                            : "POST",
                "body": {
                    "externalId"                    : ".+",
                    "notificationActive"            : /(true|false)/,
                    "fcmNotification"               : {
                        "isRegistered"              : /(true|false)/,
                        "notificationDeviceType"    : ".+",
                        "notificationDeviceName"    : ".+",
                        "projectId"                 : ".+",
                        "registrationId"            : ".+"
                    }
                }
            }
        },
        "/notification/setting/update": {
            "request": {
                "method"                            : "POST",
                "body": {
                    "externalId"                    : ".+",
                    "notificationActive"            : /(true|false)/,
                    "fcmNotification"               : {
                        "isRegistered"              : /(true|false)/,
                        "notificationDeviceType"    : ".+",
                        "notificationDeviceName"    : ".+",
                        "projectId"                 : ".+",
                        "registrationId"            : ".+"
                    }
                }
            }
        }
    };
})();