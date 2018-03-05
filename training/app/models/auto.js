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

    var Model = new BaseModel(ALLOWED_PROPERTIES);

    return Model;

});
