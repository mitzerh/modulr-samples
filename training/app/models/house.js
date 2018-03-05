Modulr.define('training.app:models/house', [
    'require',
    'lodash',
    'models/base.model'
], function(require, _, BaseModel){

    var ALLOWED_PROPERTIES = {
        // list price
        'price': {
            type: 'number'
        },
        // sq footage
        'area': {
            type: 'number'
        },
        'address': {
            type: 'string'
        },
        'zip': {
            type: 'string',
            validate: function(val) {
                return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(val) ? false : 'invalid zip code';
            }
        },
        // number of rooms
        'rooms': {
            type: 'number',
            validate: function(val) {
                // whole numbers only
                return (val % 1 === 0) ? false : 'whole numbers only';
            }
        },
        // number of baths
        'baths': {
            type: 'number',
            validate: function(val) {
                var ret = false;
                var whole = (val % 1 === 0) ? true : false;
                // only allow halves - 1.5, 2.5, etc
                if (!whole) {
                    if (val % 0.5 !== 0) { ret = 'half baths allowed only'; }
                }
                return ret;
            }
        },
        // when the house was built
        'built': {
            type: 'number',
            validate: function(val) {
                val = parseInt(val, 10);
                // numeric
                // range 1950 to current year + 1
                return (/[0-9]{4}/.test(val)
                    && /^(19|20)/.test(val)
                    && val >= 1910
                    && val <= (new Date()).getFullYear()+1) ? false : 'must be a valid year starting 1910';
            }
        }
    };

    var Model = new BaseModel('house', ALLOWED_PROPERTIES);

    return Model;

});
