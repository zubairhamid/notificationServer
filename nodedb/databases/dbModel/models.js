(function () {
    <!--##################################Require the Modules########################################################-->

    var dbConn = require('@cloudmpower/globaldb');

    var modelextender = require('@cloudmpower/modelextender');

    var timestamps = require('@cloudmpower/utils').timestamp;

    module.exports.modelForService = function(service){

        var db = dbConn.getdbConn(service);

        var mongoose = dbConn.getConnMongoose(service),
            Schema = mongoose.Schema;

        <!--##################################Notification Schema####################################################-->
        <!--#########################################################################################################-->
        var Notification = new Schema({
            notificationId            : {type: String, required: true },
            externalId                : {type: String, required: true, unique: true },//external uniqueId
            notificationActive        : {type: Boolean, default: false },
            fcmNotification           : {
                isRegistered              : {type: Boolean, default: false },
                notificationDeviceType    : {type: String, default: '' },
                notificationDeviceName    : {type: String, default: '' },
                projectId                 : {type: String, default: '' },
                registrationId            : {type: String, default: '' },
                apiKey                    : {type: String, default: '' }
            },
            apnNotification           : {
                isRegistered              : {type: Boolean, default: false },
                notificationDeviceType    : {type: String, default: '' },
                notificationDeviceName    : {type: String, default: '' },
                projectId                 : {type: String, default: '' },
                registrationId            : {type: String, default: '' },
                apiKey                    : {type: String, default: '' }
            },
            webNotification           : {
                isRegistered              : {type: Boolean, default: false },
                notificationDeviceType    : {type: String, default: '' },
                notificationDeviceName    : {type: String, default: '' },
                projectId                 : {type: String, default: '' },
                registrationId            : {type: String, default: '' },
                apiKey                    : {type: String, default: '' }
            },
            settingData               : {}
        });

        Notification.plugin(timestamps);

        var NotificationModel = module.exports.Notification = db.model('notification', Notification);
        modelextender.populateModel('Notification', NotificationModel);

        <!--##################################History Schema#########################################################-->
        <!--#########################################################################################################-->
        var History = new Schema({
            historyId                 : {type: String, required: true },
            notificationId            : {type: String, required: true },
            externalId                : {type: String, required: true },//external uniqueId
            serviceId                 : {type: String, required: true },
            notificationDevice        : {type: String, required: true },
            notificationMessage       : {
                title                   : {type: String, required: true },
                body                    : {type: String, required: true }
            }
        });

        History.plugin(timestamps);

        var HistoryModel = module.exports.History = db.model('history', History);
        modelextender.populateModel('History', HistoryModel);
    };
})();