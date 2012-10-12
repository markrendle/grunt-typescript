module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    typescript: {
        compile: {
          files: {
            'app.js': ['app.ts', 'services.ts'],
            'utils.js': 'utils.ts'
          },
          options: {
            comments: true,
            declarations: true,
            exec: true,
            module: 'amd',
            target: 'ES5'
          }
        }
    },

    min: {
        dist: {
            src: ['app.js','utils.js'],
            dest: 'dist/all.min.js'
        }
    }
  });

  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'typescript min');
}