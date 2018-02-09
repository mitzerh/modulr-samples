Modulr.define('trainging.app:models/auto', [
    'require',
    'lodash',
    'helper'
], function(require, _, Helper){

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
            allowed: ['gas', 'diesel', 'electric', 'hybrid']
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

        var Proto = this;

        var MODEL_PROPERTIES = {};

        Proto.setProperty = function() {
            var args = arguments;
            // key, value
            if (args[0] === 'string' && typeof args[1] !== 'undefined') {
                set(args[0], args[1]);
            } else if (typeof args[0] === 'object') {
                for (var id in args[0]) {
                    set(id, args[0][id]);
                }
            } else {
                Helper.log('error setting value: key('+key+') = value('+val+')');
            }

            function set(key, val) {
                if (validateVal(key, val)) {
                    MODEL_PROPERTIES[key] = val;
                } else {
                    Helper.log('invalid property value:', key, '=', val);
                }
            }
        };

        function validateVal(key, val) {
            var propInfo = propExists(key),
                cont = (!propInfo) ? false : (typeof val === 'undefined') ? false : true;

            // continue?
            if (!cont) { return false; }

            var ret = true;

            var checks = [
                // check type
                function() {
                    return (typeof key === propInfo.type) ? true : false;
                },
                // check allowed values
                function() {
                    return (!propInfo.allowed) ? true : (propInfo.allowed && propInfo.allowed.indexOf(val) > -1) ? true : false;
                },
                // check if custom validation
                function() {
                    return propInfo.validate(val);
                }
            ];

            for (var i = 0; i < checks.length; i++) {
                if (!checks[i]()) {
                    ret = false;
                    break;
                }
            }

            return ret;
        }

        // private function
        // to check if a property name is valid
        function propExists(key) {
            return ALLOWED_PROPERTIES[key] || null;
        }

    };



    return Model;

});
