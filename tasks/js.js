var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var getGlobPaths = require('./utils/get-glob-paths');

var jsSrc = [
  'bower_components/get-size/get-size.js',
  'bower_components/desandro-matches-selector/matches-selector.js',
  'bower_components/ev-emitter/ev-emitter.js',
  'bower_components/fizzy-ui-utils/utils.js',
  // draggabilly
  'bower_components/unipointer/unipointer.js',
  'bower_components/unidragger/unidragger.js',
  'bower_components/draggabilly/draggabilly.js',
  // outlayer
  'bower_components/outlayer/item.js',
  'bower_components/outlayer/outlayer.js',
  // masonry
  'bower_components/masonry/masonry.js',
  // packery
  'bower_components/packery/js/rect.js',
  'bower_components/packery/js/packer.js',
  'bower_components/packery/js/item.js',
  'bower_components/packery/js/packery.js',
  // isotope
  'bower_components/isotope/js/layout-mode.js',
  'bower_components/isotope/js/item.js',
  'bower_components/isotope/js/isotope.js',
  'bower_components/isotope/js/layout-modes/fit-rows.js',
  // flickity deps
  'bower_components/tap-listener/tap-listener.js',
  // flickity
  'bower_components/flickity/js/cell.js',
  'bower_components/flickity/js/slide.js',
  'bower_components/flickity/js/animate.js',
  'bower_components/flickity/js/flickity.js',
  'bower_components/flickity/js/prev-next-button.js',
  'bower_components/flickity/js/page-dots.js',
  'bower_components/flickity/js/drag.js',
  // infinite-scroll
  'bower_components/infinite-scroll/js/core.js',
  'bower_components/infinite-scroll/js/scroll-watch.js',
  // boilerplate
  'js/boilerplate.js',
  // modules
  'modules/*/**/*.js',
  // init
  'js/init.js',
];

// concat & minify js
gulp.task( 'js', function() {
  gulp.src( jsSrc )
    .pipe( uglify() )
    .pipe( concat('fizzy-school.min.js') )
    .pipe( gulp.dest('build') );
});

module.exports = function( site ) {
  site.data.jsPaths = getGlobPaths( jsSrc );
};
