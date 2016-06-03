(function(){

    var router = require('../route');

    module.exports = [
        {
            path: '/notification/integrate/dummy',
            method: 'post',
            callApi: router.apiCalls.dummy
        },
        {
            path: '/notification/setting/add',
            method: 'post',
            callApi: router.apiCalls.configureNotifier
        },
        {
            path: '/notification/setting/update',
            method: 'post',
            callApi: router.apiCalls.updateNotifier
        }
    ];

})();