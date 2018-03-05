Modulr.define('training.app:models/auto', [
    'require',
    'lodash',
    'models/base.model'
], function(require, _, BaseModel){

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
        'type': {
            type: 'string',
            allowed: ['sedan', 'suv', 'coupe', 'pickup', 'van']
        },
        'transmission': {
            type: 'string',
            allowed: ['automatic', 'manual']
        },
        'fuel': {
            type: 'string',
            allowed: ['gas', 'diesel', 'electric', 'hybrid']
        },
        'year': {
            type: 'number',
            validate: function(val) {
                val = parseInt(val, 10);
                // numeric
                // range 1950 to current year + 1
                return (/[0-9]{4}/.test(val)
                    && /^(19|20)/.test(val)
                    && val >= 1950
                    && val <= (new Date()).getFullYear()+1) ? false : 'must be a valid year starting 1950';
            }
        }
    };

    var Model = new BaseModel('auto', ALLOWED_PROPERTIES);

    return Model;

});
