(function(){

    var path = require('path');

    var fs = require('fs');

    var http = require('http');

    var CoreHandle = function CoreHandle(config, tnxId) {
        this.config = config;
        this.tnxId = tnxId;
        this.startedAt = new Date();
        this.responseData = '';
        this.incorrectResponse = {
            status : 400,
            responseData : {
                message: "Gateway not reachable"
            }
        };
        this.options = config.gatewayConfig || {};
    };

    CoreHandle.prototype = {
        gatewayHandler : function(request, callback){
            this.callback = callback;
            this.requestBody = JSON.stringify(request);
            var resHandle = this.serverCaller.bind(this);
            resHandle();
        },
        serverCaller: function(){
            var that = this;
            var resHandle = this.serverResponseHandler.bind(this);
            this.httpRequest = http.request(this.options, resHandle);

            this.httpRequest.on('error', function (e) {
                console.log('Core Request Failed : ' + e.message);
                that.callback(that.incorrectResponse , null);
            });

            // write data to request body
            this.httpRequest.write(this.requestBody);
            this.httpRequest.end();
        },
        serverResponseHandler: function (res) {
            var that = this;
            if(res.statusCode == "500") return this.callback(this.incorrectResponse , null);

            res.on('data', function (chunk) {
                that.responseData = that.responseData + chunk;
            });

            res.on('end' , function(){
                console.log('Core Request Responded At: ' + (new Date() - that.startedAt) +' ms Core return Object : ' + that.responseData);
                try {
                    var response = JSON.parse(that.responseData);
                    that.checkJSONResponse(response);
                }catch(err){
                    console.log('InCorrect Json Format sent from Core');
                    that.callback(that.incorrectResponse , null);
                }
            });
        },
        checkJSONResponse: function(response){
            if(response.status != 200){
                this.callback(response, null);
            }else{
                this.callback(null, response);
            }
        }
    };

    module.exports = function(config , tnxId){
        return (new CoreHandle(config , tnxId));
    };
})();