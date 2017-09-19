/* jshint node: true, unused: true, undef: true */

var gulp = require('gulp');

var taskName = process.argv[2];

var watches = [];

var site = {
  data: {
    dev: taskName == 'dev',
  },
  watch: function( src, tasks ) {
    watches.push( [ src, tasks ] );
  },
};

require('./tasks/assets')( site );
require('./tasks/css')( site );
require('./tasks/js')( site );
require('./tasks/content')( site );

// ----- default ----- //

gulp.task( 'default', [
  'content',
  'assets',
  'css',
  'js',
]);

// ----- serve ----- //

var serve = require('gulp-serve');

gulp.task( 'serve', serve('build') );

// ----- dev ----- //

gulp.task( 'dev', [
  'content',
], function() {
  watches.forEach( function( watchable ) {
    gulp.watch.apply( gulp, watchable );
  });
});
