Modulr.define('training.app:helper', [
    'require'
], function(require){

    var Helper = function() {

        var Proto = this;

        Proto.log = function() {
            if (window.console) {
                var args = Array.prototype.slice.call(arguments);
                try {
                    return window.console.log.apply(console, args);
                } catch(err) {
                    // do nothing
                }
            }
        };

    };

    return (new Helper());
});
