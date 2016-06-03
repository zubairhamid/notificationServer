(function(){
    var paperwork = require('@cloudmpower/utils').paperwork;

    module.exports.completedChallenge = function(arr){
        var schema = [{
            completeDated     : "",
            dayNo             : "",
            dateStatus        : true
        }];

        if(!paperwork.accepted(schema, arr)) throw new Error('Incorrect Body parameters');
        return paperwork.accepted(schema, arr);
    };
})();