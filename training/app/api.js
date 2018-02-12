Modulr.define('trainging.app:api', [
    'require'
], function(require){

    var API = {
        getAutoModel: function(callback) {
            require(['models/auto']).then(function(model){
                callback(model);
            });
        }
    };

    return API;

});
