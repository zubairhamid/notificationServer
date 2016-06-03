(function(){

    var getMethod = require('../config/getGlobalMethod');

    var parseRequestApi = function parseRequestApi(rin , callback){
        this.response = rin;
        this.body = rin.request.body;
        this.callback = callback;
        this.tnxId = rin.header['x-request-id'] || '';
        this.response.config.serviceFrom = rin.header['x-service-from'] || '';
    };

    parseRequestApi.prototype.requestApi = function(){
        var methodName = getMethod.FileName;
        var response = getMethod(methodName.responseHandler)(this.response, this.callback, this.tnxId);
        var resHandle = response.requestHandle.bind(this);
        var selectedMethod = getMethod(this.response.moduleName)(this.response.config , this.tnxId);
        selectedMethod[this.response.apiRedirect](this.response , resHandle);
    };

    module.exports.parseRequestApi = function(rin , callback){
        var dApi = new parseRequestApi(rin , callback);
        dApi.requestApi();
    };
})();