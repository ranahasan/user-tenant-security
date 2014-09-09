'use strict';

/**
 * Asset controller to get access of the assets used in the web application
 * @type {{partials: {handler: {directory: {path: string}}, app: {name: string}}, images: {handler: {directory: {path: string}}, app: {name: string}}, css: {handler: {directory: {path: string}}, app: {name: string}}, fonts: {handler: {directory: {path: string}}, app: {name: string}}, js: {handler: {directory: {path: string}}, app: {name: string}}, lib: {handler: {directory: {path: string}}, app: {name: string}}}}
 */
module.exports = {
    partials: {
        handler: {
            directory: { path: './public/views/partials' }
        },
        app: {
            name: 'partials'
        }
    },
    images: {
        handler: {
            directory: { path: './public/static/img' }
        },
        app: {
            name: 'images'
        }
    },
    css: {
        handler: {
            directory: { path: './public/static/css' }
        },
        app: {
            name: 'css'
        }
    },
    fonts: {
        handler: {
            directory: { path: './public/static/fonts' }
        },
        app: {
            name: 'fonts'
        }
    },
    js: {
        handler: {
            directory: { path: './public/js' }
        },
        app: {
            name: 'js'
        }
    },
    lib: {
        handler: {
            directory: { path: './public/lib' }
        },
        app: {
            name: 'lib'
        }
    }
};