Modulr.define('training.app:api', [
    'require',
    'models/auto',
    'models/house'
], function(require){

    var API = {
        getModel: function(type) {
            var allow = ['auto', 'house'];
            if (allow.indexOf(type) === -1) { alert('model not found:' + type); return; }
            return require('models/' + type);
        }
    };

    return API;

});
