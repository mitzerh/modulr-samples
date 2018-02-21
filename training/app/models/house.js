Modulr.define('training.app:models/house', [
    'require',
    'lodash',
    'helper',
    'models/base.property'
], function(require, _, Helper, BaseProperty){

    var ALLOWED_PROPERTIES = {
        // list price
        'price': {
            type: 'number'
        },
        // sq footage
        'area': {
            type: 'number'
        },
        'status': {
            type: 'string',
            allowed: ['sell', 'foreclose', 'shortsale']
        },
        // number of rooms
        'rooms': {
            type: 'number',
            validate: function(val) {
                // whole numbers only
                return (val % 1 === 0) ? true : false;
            }
        },
        // number of baths
        'baths': {
            type: 'number',
            validate: function(val) {
                var ret = true;
                var whole = (val % 1 === 0) ? true : false;
                // only allow halves - 1.5, 2.5, etc
                if (!whole) {
                    if (val % 0.5 !== 0) { ret = false; }
                }
                return ret;
            }
        },
        // when the house was built
        'built': {
            type: 'number',
            validate: function(val) {
                return /^[0-9]{4,4}$/.test(val) ? true : false;
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
