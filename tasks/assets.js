var gulp = require('gulp');

gulp.task( 'assets', function() {
  gulp.src( 'assets/**/*.*' )
    .pipe( gulp.dest('build') );
});

module.exports = function() {
};
