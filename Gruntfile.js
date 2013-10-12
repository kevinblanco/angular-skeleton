/**
 * @module     GruntFile
 * @desc       Grunt configuration
 * @author     Kevin Blanco <me@kevin-blanco.com>
 * @repo       git@github.com:kevinblanco/angular-skeleton.git
 */

module.exports = function(grunt) {

  var path = require('path');
  var root = path.normalize(__dirname+"/..");
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
  var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
  };

  /**
   * BASE deploy / public file-path
   */
  const BASE = './';

  /**
   * The location of the development sources
   */
  const SOURCES = BASE + 'src/';

  /**
   * Directory to output compiled source-files
   */
  const DIST = BASE + 'public/';

  /**
   * The port number to mount the NodeJS Server
   */
  const PORT = 3001


  /**
   *  Grunt Configuration
   */
  grunt.initConfig({


    // Package Loading
    pkg: grunt.file.readJSON('package.json'),


    //
    // Clean Directories
    // 
    clean: {
      local: DIST
    },


    //
    // Uglify JS
    // 
    uglify: {
      vendor: {
        files: {
           DIST + 'js/vendor.min.js': [ SOURCES + 'scripts/vendor/angular.min.js', SOURCES + 'scripts/vendor/angular-bootstrap.min.js']
        }
      },
      own:{
        files: {
          DIST + 'js/app.min.js': [ SOURCES + 'scripts/*.js']
        }
      }
    },


    //
    // Compile SASS
    // 
    sass: {
      local: {

        files: [{
          expand: true,
          cwd: SOURCES + 'styles/export',
          src: ['*.scss'],
          dest: DIST + 'css',
          ext: '.css'
        }],

        options: {
          style: 'compact',
          debug: false
        }
      }
    },


    //
    // Copy Files
    // 
    copy:{
      html:{
       files: [
         {
            expand: true, 
            cwd: SOURCES + 'html/',
            src: ['**'], 
            dest: DIST
          }
        ]
      }
    },
    

    //
    // Starts a Connect Server
    // 
    connect: {
      server: {
        options: {
          port: PORT,
          base: DIST,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },


    //
    // Add the livereload server
    // 
    'livereload': {
      port: 35729
    },


    //
    // Notify System
    // 
    notify_hooks: {
      options: {
        enabled: true,
        title: "<%= pkg.name %>"
      }
    },


    //
    // Notify Messages
    // 
    notify: {
      pages: {
        options: {
          title: '<%= pkg.name %>',
          message: 'Html - Done!'
        }
      },
      scripts: {
        options: {
          title: '<%= pkg.name %>',
          message: 'Javascript - Done!'
        }
      },
      styles: {
        options: {
          title: '<%= pkg.name %>',
          message: 'Sass - Done!'
        }
      }
    },


    //
    // Watch Changes
    // 
    regarde: {

      pages: {
        files: SOURCES +'html/**/*',
        tasks: ['copy:html', 'notify:pages', 'livereload']
      },

      scripts: {
        files: [
          SOURCES + 'scripts/**/*'
        ],
        tasks: ['uglify', 'notify:scripts', 'livereload']
      },

      styles: {
        files: SOURCES + 'styles/**/*',
        tasks: ['sass:local', 'notify:styles', 'livereload']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-notify');

  // Growl Notification Hook
  grunt.task.run('notify_hooks');

  // Default task.
  grunt.registerTask('run', ['clean', 'uglify:vendor', 'uglify:own', 'copy:html', 'sass:local', 'livereload-start', 'connect:server', 'regarde']);

};