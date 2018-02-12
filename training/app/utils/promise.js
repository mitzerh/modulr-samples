Modulr.define('training.app:utils/promise', [
    'require'
], function(require){

    var Util = function(sender) {

        var Proto = this,
            _resolve = [],
            _reject = null;

        Proto.then = Proto.resolve = function(cb){
            if (typeof cb === 'function') {
                _resolve.push(cb);
            }
            return this;
        };

        Proto.reject = function(cb) {
            if (typeof cb === 'function') {
                _reject = cb;
            }
        };

        sender(function(data){
            if (_resolve) {
                while (_resolve.length > 0) {
                    var fn = _resolve.shift();
                    data = fn(data);
                }
            }
        }, function(data){
            if (_reject) {
                _reject(data);
            }
        });
    };

    return Util;
});
