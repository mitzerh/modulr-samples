(function(Modulr){

    // check if instance already instantiated
    if (Modulr.getInstance('training.app')) { return false; }

    var Instance = Modulr.config({
        // unique instance identifier
        instance: "training.app",
        // base domain url
        baseDomain: 'https://www.hmabesa.com',
        // base pathname
        baseUrl: "/misc/modulr/samples/training/app",
        // master file
        masterFile: "",
        // other package paths
        packages: {

        },
        shim: {
            'lodash': {
                src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.min.js',
                exports: '_'
            }
        }
    });
    
}(window.Modulr));
