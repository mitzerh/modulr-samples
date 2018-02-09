(function(Modulr){

    // check if instance already instantiated
    if (Modulr.getInstance('trainging.app')) { return false; }

    var Instance = Modulr.config({
        // unique instance identifier
        instance: "trainging.app",
        // base domain url
        baseDomain: '//' + window.location.host,
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
