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
                throw new Error('error setting value, check log');
            }

            function set(key, val) {
                if (validateVal(key, val)) {
                    MODEL_PROPERTIES[key] = val;
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
                    return (typeof val === propInfo.type) ? true : ('must be of type: ' + propInfo.type);
                },
                // check allowed values
                function() {
                    return (!propInfo.allowed) ? true : (propInfo.allowed && propInfo.allowed.indexOf(val) > -1) ? true : ('allowed values: ' + propInfo.allowed.join(', '));
                },
                // check if custom validation
                function() {
                    var ret = true;
                    if (propInfo.validate) {
                        var resp = propInfo.validate(val);
                        if (typeof resp === 'string') {
                            ret = resp;
                        }
                    }
                    return ret;
                }
            ];

            for (var i = 0; i < checks.length; i++) {
                var checkVal = checks[i]();
                if (checkVal !== true) {
                    ret = false;
                    throw 'validation error: [property=' + key + '] ' + checkVal;
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

    return function(name, ALLOWED_PROPERTIES) {

        // instantiate from base model
        var BASE_MODEL = new BaseModel(ALLOWED_PROPERTIES);

        var Model = function() {
            var self = this;
            // use only function methods
            for (var prop in BASE_MODEL) {
                if (BASE_MODEL.hasOwnProperty(prop) && typeof BASE_MODEL[prop] === 'function' && prop !== 'getPropertyList') {
                    self[prop] = BASE_MODEL[prop];
                }
            }
        };

        // accessible attributes
        Model._MODEL_NAME = name;
        Model._PROPERTY_LIST = BASE_MODEL.getPropertyList();

        return Model;
    };

});
