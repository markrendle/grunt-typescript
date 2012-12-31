/*
 * grunt-typescript
 *
 * Copyright (c) 2012 Mark Rendle
 * Licensed under the MIT license.
 * Derived from the grunt-contrib-sass code by Sindre Sorhus et al.
 */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var path = require('path');
  var async = grunt.util.async;

  grunt.registerMultiTask('typescript', 'Compile TypeScript to JavaScript', function() {
    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this);
    var cb = this.async();
    var args = helpers.optsToArgs(options);
    var tsc = this.data.tsc || 'tsc';

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);
    async.forEachSeries(this.files, function(el, cb2) {
      args = args.concat(['--out', el.dest]); + ' ' + srcArg;
      var srcArg;
      if (Array.isArray(el.src)) {
        args = args.concat(el.src);
      } else {
        args.push(el.src);
      }

      // // Make sure grunt creates the destination folders
      grunt.file.write(el.dest, '');

      grunt.util.spawn({
        cmd: tsc,
        args: args
      }, function(error, result, code){
        cb2(code > 0);
      }).on('exit', function (code){
        if (code === 127) {
          grunt.fail.fatal('Command ' + tsc + ' not found.');
        }
        else if (code !== 0) {
          grunt.fail.fatal('Error code ' + code + ' returned from tsc.');
        }
      });
    }, function(error) {
      cb(!error);
    });
  });
};