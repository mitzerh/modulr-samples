Modulr.define('training.app:api', [
    'require'
], function(require){

    var API = {
        getModel: function(type, callback) {
            var allow = ['auto', 'house'];
            if (allow.indexOf(type) === -1) { alert('model not found:' + type); return; }
            require(['models/' + type]).then(function(model){
                callback(model);
            });
        }
    };

    return API;

});
