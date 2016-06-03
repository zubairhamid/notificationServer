(function(){

    var moment = require('moment');

    var later = require('later');

    var getMethod = require('../config/getGlobalMethod');

    var methodName = getMethod.FileName;

    var Scheduler = function Scheduler(config, tnxId){
        this.config = config;
        this.config.requestType = 'Query';
        this.tnxId = 'Scheduler Manager';
        later.date.UTC();
    };

    Scheduler.prototype = {
        runScheduleJobs: function(){
           // var everyDay1130am = later.parse.text('at 6:00 am');//
            var everyDay1130am = later.parse.text('every 1 mins');//
            //var everyDay730am = later.parse.text('at 2:00 am');//
            this.scheduleServices("iDidItNotifier", everyDay1130am, this.config, this.tnxId);
        },
        scheduleServices: function(fName, timer, config, tnxId){
            later.setInterval(function(){
                var scheduler = new Scheduler(config, tnxId);
                scheduler[fName]();
            }, timer);
        },
        iDidItNotifier: function(){

            var notification = getMethod(methodName.notification)(this.config, this.tnxId);
            var query = {processHandler:  "iDidItNotice" };

            var resHandle = this.defaultDoNothing.bind(this);
            notification.listConfiguredNotifiers(query, resHandle);
        },
        defaultDoNothing: function(){}
    };

    module.exports = function(config , tnxId){
        return (new Scheduler(config , tnxId));
    };
})();