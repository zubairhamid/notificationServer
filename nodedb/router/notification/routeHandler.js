(function(){

    var apiLoader = require('@cloudmpower/apiloader');

    module.exports = function (app) {
        apiLoader(app, './nodedb/router/notification/apiConfig');
    };
})();