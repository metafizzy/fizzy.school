var gulp = require('gulp');
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');
var rename = require('gulp-rename');
var highlightCodeBlock = require('./utils/highlight-code-block');
var extendLayout = require('./utils/extend-layout');
var hb = require('gulp-hb');
var hbLayouts = require('handlebars-layouts');
var htmlInMd = require('./utils/html-in-md');

var contentSrc = 'content/*.md';
var layoutsSrc = 'layouts/*.hbs';

module.exports = function( site ) {

  gulp.task( 'content', function() {

    var handlebars = hb()
      .partials( layoutsSrc )
      .helpers( hbLayouts )
      .data( site.data )

    var front = frontMatter({
      property: 'data.page',
      remove: true
    });

    gulp.src( contentSrc )
      .pipe( front )
      .pipe( highlightCodeBlock() )
      .pipe( markdown() )
      .pipe( htmlInMd() )
      .pipe( extendLayout() )
      .pipe( handlebars )
      .pipe( rename({ extname: '.html' }) )
      .pipe( gulp.dest('build') );
  });

  site.watch( contentSrc, [ 'content' ] );
  site.watch( layoutsSrc, [ 'content' ] );

};
