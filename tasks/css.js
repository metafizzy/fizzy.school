var gulp = require('gulp');
var concat = require('gulp-concat');
var getGlobPaths = require('./utils/get-glob-paths');

var cssSrc = [
  'bower_components/normalize-css/normalize.css',
  'bower_components/flickity/dist/flickity.css',
  'assets/css/fonts.css',
  'assets/css/base.css',
  'modules/*/**/*.css',
];

gulp.task( 'css', function() {
  gulp.src( cssSrc )
    .pipe( concat('fizzy-school.css') )
    .pipe( gulp.dest('build/css') );
});

module.exports = function( site ) {
  site.data.cssPaths = getGlobPaths( cssSrc );
};
