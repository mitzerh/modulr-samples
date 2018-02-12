Modulr.define('training.app:models/auto', [
    'require',
    'lodash',
    'helper',
    'models/base.property'
], function(require, _, Helper, BaseProperty){

    var ALLOWED_PROPERTIES = {
        'make': {
            type: 'string'
        },
        'model': {
            type: 'string'
        },
        'color': {
            type: 'string'
        },
        'price': {
            type: 'number'
        },
        'transmission': {
            type: 'string',
            allowed: ['automatic', 'manual']
        },
        'fuel': {
            type: 'string',
            validate: function(val) {
                var allowed = ['gas', 'diesel', 'electric', 'hybrid'];
                return (allowed.indexOf(val) > -1) ? true : false;
            }
        },
        'year': {
            type: 'number',
            validate: function(val) {
                val = parseInt(val, 10);
                // numeric
                // range 1990 to current year + 1
                return (/[0-9]{4}/.test(val) && /^(19|20)/.test(val) && val >= 1990 && val <= (new Date()).getFullYear()+1) ? true : false;
            }
        }

    };

    var Model = function() {
        // instantiate from base model
        var BASE_MODEL = new BaseProperty(ALLOWED_PROPERTIES);
        // use only function methods
        for (var prop in BASE_MODEL) {
            if (BASE_MODEL.hasOwnProperty(prop) && typeof prop === 'function') {
                this[prop] = BASE_MODEL[prop];
            }
        }
    };

    return Model;

});
