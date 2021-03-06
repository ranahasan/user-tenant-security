'use strict';

module.exports = function (grunt) {
    var watchFiles = {
        serverJS: ['gruntfile.js', 'src/server.js', 'src/api/**/*.js'],
        clientViews: ['src/web/views/*.html', 'src/web/views/partials/*.html'],
        clientJS: ['src/web/js/*.js', 'src/web/js/**/*.js'],
        clientCSS: ['src/web/static/css/*.css'],
        labTests: ['test/api/*.js']
    };
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: watchFiles.clientJS.concat(watchFiles.serverJS),
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'src/server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverJS
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        lab: {
            files: watchFiles.labTests,
            color: true,
            coverage: true,
            minCoverage: 90,
            parallel: true
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        jsdoc: {
            dist: {
                src: [watchFiles.serverJS, watchFiles.clientJS],
                options: {
                    destination: 'doc'
                }
            }
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // Default task(s).
    grunt.registerTask('default', ['lint', 'concurrent:default']);

    // Debug task.
    grunt.registerTask('debug', ['lint', 'concurrent:debug']);

    // Lint task(s).
    grunt.registerTask('lint', ['jshint', 'csslint']);

    // Build task(s).
    //grunt.registerTask('build', ['lint', 'loadConfig', 'ngmin', 'uglify', 'cssmin']);

    // Test task.
    grunt.registerTask('test', ['env:test', 'lab', 'karma:unit']);

    grunt.registerTask('doc', ['jsdoc']);
};