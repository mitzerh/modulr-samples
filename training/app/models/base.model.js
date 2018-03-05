Modulr.define('training.app:models/base.model', [
    'require',
    'helper'
], function(require, Helper){

    var BaseModel = function(ALLOWED_PROPERTIES) {

        var Proto = this;

        var MODEL_PROPERTIES = {},
            PROP_LIST = [];

        Proto.setProperty = function() {
            var args = arguments;
            // key, value
            if (typeof args[0] === 'string' && typeof args[1] !== 'undefined') {
                set(args[0], args[1]);
            } else if (typeof args[0] === 'object') {
                for (var id in args[0]) {
                    set(id, args[0][id]);
                }
            } else {
                Helper.log('error setting value:', args);
            }

            function set(key, val) {
                if (validateVal(key, val)) {
                    MODEL_PROPERTIES[key] = val;
                } else {
                    Helper.log('invalid property value:', key, '=', val);
                }
            }
        };

        Proto.getProperty = function(key) {
            var res;
            if (!key) {
                res = {};
                for (var id in MODEL_PROPERTIES) {
                    res[id] = MODEL_PROPERTIES[id]; // shallow clone
                }
            } else {
                res = propExists(key) ? MODEL_PROPERTIES[key] : null;
            }
            return res;
        };

        Proto.getPropertyList = function() {
            if (PROP_LIST.length === 0) {
                var arr = [];
                for (var id in ALLOWED_PROPERTIES) {
                    arr.push(id);
                }
                PROP_LIST = arr;
            }
            return PROP_LIST;
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
                    return (typeof val === propInfo.type) ? true : false;
                },
                // check allowed values
                function() {
                    return (!propInfo.allowed) ? true : (propInfo.allowed && propInfo.allowed.indexOf(val) > -1) ? true : false;
                },
                // check if custom validation
                function() {
                    return (!propInfo.validate) ? true : propInfo.validate(val);
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

    return function(ALLOWED_PROPERTIES) {

        var Model = function() {
            var self = this;
            // instantiate from base model
            var BASE_MODEL = new BaseModel(ALLOWED_PROPERTIES);
            // use only function methods
            for (var prop in BASE_MODEL) {
                if (BASE_MODEL.hasOwnProperty(prop) && typeof prop === 'function') {
                    self[prop] = BASE_MODEL[prop];
                }
            }
        };

        return Model;
    };

});
