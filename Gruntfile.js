module.exports = function(grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),


        DEV_PATH: "src",
        TEMP_PATH: ".grunt",
        BUILD_PATH: "<%= TEMP_PATH %>/build",
        PROD_PATH: "dist",

        /**
         * This will be injected at the top of the minified script/css files.
         */
        banner: [
            '/*',
            ' * Project: <%= pkg.name %>',
            ' * Version: <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)',
            ' * Author: <%= pkg.author %>',
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> Artist Growth, LLC',
            ' */'
        ],

        /**
         * HTML validation settings.
         */
        htmlhint: {
            build: {
                options: {
                    "tag-pair": true,
                    "tagname-lowercase": true,
                    "attr-lowercase": true,
                    "attr-value-double-quotes": true,
                    "doctype-first": true,
                    "spec-char-escape": true,
                    "id-unique": true,
                    "head-script-disabled": true,
                    "style-disabled": true
                },
                src: ["<%= BUILD_PATH %>/index.html"]
            }
        },

        /**
         * Javascript validation settings. Only non-vendor scripts will be
         * analyzed.
         */
        jshint: {
            build: "<%= DEV_PATH %>/js/*.js"
        },

        clean: {
            dev: ["<%= DEV_PATH %>/app.css", "<%= BUILD_PATH %>"],
            prod: ["<%= PROD_PATH %>"]
        },

        less: {
            build: {
                src: "<%= DEV_PATH %>/less/app.less",
                dest: "<%= BUILD_PATH %>/css/app.css",
                options: {
                    paths: [
                        "<%= DEV_PATH %>/bower_components/bootstrap/less",
                        "<%= DEV_PATH %>/less"
                    ]
                }
            }
        },

        /**
         * Attaches a banner to the top of any generated minified files.
         */
        usebanner: {
            prod: {
                options: {
                    position: "top",
                    banner: "<%= banner.join('\\n') %>",
                    linebreak: true
                },

                files: {
                    src: [
                        "<%= PROD_PATH %>/js/app.min.js",
                        "<%= PROD_PATH %>/css/app.min.css"
                    ]
                }
            }
        },

        /**
         * Generates concat, uglify, and cssmin tasks based on comment blocks
         * found in the target HTML files.
         */
        useminPrepare: {
            html: ["<%= BUILD_PATH %>/**/*.html"],
            options: {
                root: "<%= BUILD_PATH %>",
                dest: "<%= PROD_PATH %>"
            }
        },

        /**
         * Substitutes minified JS/CSS files for the original source files found
         * in comment blocks in the target HTML files.
         */
        usemin: {
            html: ["<%= PROD_PATH %>/**/*.html"],
            options: {
                dirs: ["<%= PROD_PATH %>"]
            }
        },

        /**
         * Additional parameters for Uglify. These will be used in addition to
         * the task that is generated by useminPrepare.
         */
        uglify: {
            options: {
                compress: {
                    global_defs: {
                        "DEBUG": false
                    },
                    drop_console: true,
                    dead_code: true
                }
            }
        },

        bower: {
            dev: {
                dest: "<%= BUILD_PATH %>/js/vendor",
                options: {
                    packageSpecific: {
                        "jquery-ui": {
                            files: [
                                "ui/jquery.ui.core.js",
                                "ui/jquery.ui.widget.js",
                                "ui/jquery.ui.mouse.js",
                                "ui/jquery.ui.slider.js"
                            ]
                        },
                        "video.js": {
                            files: [
                                "dist/video-js/video.dev.js"
                            ]
                        },
                        "isotope": {
                            files: [
                                "dist/isotope.pkgd.js"
                            ]
                        },
                        "jsplumb": {
                            files: [
                                "dist/js/jquery.jsPlumb-1.6.2.js"
                            ]
                        },
                        "gsap": {
                            files: [
                                "src/uncompressed/TweenMax.js"
                            ]
                        },
                        "ScrollMagic": {
                            files: [
                                "js/jquery.scrollmagic.js"
                            ]
                        },
                        "spin.js": {
                            files: [
                                "spin.js",
                                "jquery.spin.js"
                            ]
                        },
                        "waitForImages": {
                            files: [
                                "dist/jquery.waitforimages.min.js"
                            ]
                        }
                    }
                }
            }
        },

        /**
         * Copies files from one place to another.
         */
        copy: {
            dev: {
                files: [
                    { expand: true, cwd: "<%= DEV_PATH %>", src: ["js/*.js"], dest: "<%= BUILD_PATH %>" },
                ]
            },

            prod: {
                files: [
                    { expand: true, cwd: "<%= BUILD_PATH %>", src: ["fonts/**"], dest: "<%= PROD_PATH %>" },
                    { expand: true, cwd: "<%= BUILD_PATH %>", src: ["images/**"], dest: "<%= PROD_PATH %>" },
                    { expand: true, cwd: "<%= BUILD_PATH %>", src: ["index.html"], dest: "<%= PROD_PATH %>", filter: "isFile" },
                    { expand: true, cwd: "<%= BUILD_PATH %>", src: ["team/index.html"], dest: "<%= PROD_PATH %>", filter: "isFile" },
                    { expand: true, cwd: "<%= BUILD_PATH %>", src: ["benefits/index.html"], dest: "<%= PROD_PATH %>", filter: "isFile" },
                    { expand: true, cwd: "<%= BUILD_PATH %>", src: ["jobs/index.html"], dest: "<%= PROD_PATH %>", filter: "isFile" },
                    { expand: true, cwd: "<%= BUILD_PATH %>", src: ["press/index.html"], dest: "<%= PROD_PATH %>", filter: "isFile" },
                    { expand: true, cwd: "<%= BUILD_PATH %>", src: ["privacy/index.html"], dest: "<%= PROD_PATH %>", filter: "isFile" },
                    { expand: true, cwd: "<%= BUILD_PATH %>", src: ["terms/index.html"], dest: "<%= PROD_PATH %>", filter: "isFile" },
                    { expand: true, cwd: "<%= BUILD_PATH %>", src: ["CNAME"], dest: "<%= PROD_PATH %>", filter: "isFile" },
                ]
            }
        },

        /**
         * Performs some basic HTML minification. This is currently configured
         * to be pretty unaggressive.
         */
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: false
                },
                expand: true,
                cwd: "<%= PROD_PATH %>",
                src: "**/*.html",
                dest: "<%= PROD_PATH %>"
            }
        },

        /**
         * Jekyll build.
         */
        jekyll: {
            build: {
                src: "<%= DEV_PATH %>/_layouts",
                dest: "<%= BUILD_PATH %>"
            }
        },

        /**
         * Defines local web servers for each environment.
         */
        express: {
            dev: {
                options: {
                    port: 8000,
                    hostname: "127.0.0.1",
                    bases: ["<%= BUILD_PATH %>"],
                    livereload: true
                }
            },

            prod: {
                options: {
                    port: 8001,
                    hostname: "127.0.0.1",
                    bases: ["<%= PROD_PATH %>"],
                    livereload: true
                }
            }
        },

        /**
         * Opens the default browser to the specified path, which will be one of
         * the express web server definitions.
         */
        open: {
            dev: {
                path: "http://<%= express.dev.options.hostname %>:<%= express.dev.options.port %>/"
            },

            prod: {
                path: "http://<%= express.prod.options.hostname %>:<%= express.prod.options.port %>/"
            }
        },

        /**
         * Performs the following tasks automagically:
         *    - Refreshes the browser window when index.html or any of the CSS
         *      files are changed (requires LiveReload extension in Chrome).
         *    - Runs htmlhint whenever index.html is changed.
         *    - Runs jshint whenever non-vendor JS is changed.
         *    - Compiles LESS files whenever they are changed.
         */
        watch: {
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    "<%= BUILD_PATH %>/index.html",
                    "<%= BUILD_PATH %>/team/index.html",
                    "<%= BUILD_PATH %>/benefits/index.html",
                    "<%= BUILD_PATH %>/jobs/index.html",
                    "<%= BUILD_PATH %>/press/index.html",
                    "<%= BUILD_PATH %>/privacy/index.html",
                    "<%= BUILD_PATH %>/terms/index.html",
                    "<%= BUILD_PATH %>/css/*.css",
                    "<%= BUILD_PATH %>/js/**/*.js"
                ]
            },

            html: {
                files: "<%= htmlhint.build.src %>",
                tasks: ["htmlhint"]
            },

            jshint: {
                files: "<%= jshint.build %>",
                tasks: ["jshint", "copy:dev"]
            },

            less: {
                files: ["<%= less.build.src %>"],
                tasks: ["less"]
            },

            jekyll: {
                files: [
                    "<%= DEV_PATH %>/_layouts/*.html",
                    "<%= DEV_PATH %>/_includes/*.html",
                    "<%= DEV_PATH %>/*.html"
                ],
                tasks: ["build:dev"]
            }
        },

        "gh-pages": {
            options: {
                base: "<%= PROD_PATH %>",
                message: "Automated commit by Grunt deploy script"
            },

            master: {
                options: {
                    branch: "master"
                },
                src: ["**"]
            },

            "gh-pages": {
                options: {
                    branch: "gh-pages"
                },
                src: ["**"]
            },

            "test": {
                options: {
                    branch: "deploy-test"
                },
                src: ["**"]
            }
        }
    });

    /**
     * Grunt Tasks
     *
     * grunt [--target=dev]
     *    Perform a development build and serve it locally. HTML/CSS files will
     *    be monitored for changes, and the page will be automatically reloaded.
     *    As dev is the default target environment, the target parameter is
     *    optional.
     *
     * grunt --target=prod
     *    Perform a production build and serve it locally.
     *
     * grunt build [--target=dev|prod]
     *    Perform a build of the project without starting a server. If no target
     *    environment is specified, then dev will be used.
     *
     * grunt server [--target=dev|prod]
     *    Launch a server for the target environment. If no target environment
     *    is specified, then dev will be used.
     */

    var target = grunt.option("target") || "dev",
        branch = grunt.option("branch") || "test";

    grunt.registerTask("default", ["build:" + target, "server:" + target]);
    grunt.registerTask("build", ["build:" + target]);
    grunt.registerTask("server", ["server:" + target]);
    grunt.registerTask("deploy", ["build:prod", "gh-pages:" + branch]);

    grunt.registerTask("server:dev", [
        "express:dev",
        "open:dev",
        "watch"
    ]);

    grunt.registerTask("build:dev", [
        "clean:dev",
        "jekyll",
        "bower",
        "jshint",
        "htmlhint",
        "less"
    ]);

    grunt.registerTask("build:prod", [
        "build:dev",
        "clean:prod",
        "copy:prod",
        "useminPrepare",
        "concat",
        "cssmin",
        "uglify",
        "usemin",
        "usebanner",
        "htmlmin"
    ]);

    grunt.registerTask("server:prod", [
        "express:prod",
        "open:prod",
        "express-keepalive"
    ]);
};
