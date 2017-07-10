var transfob = require('transfob');

 // HACK
// Using Markdown within an HTML block breaks Markdown
// This replaces comment tags with HTML
// <!-- html-in-md <div class="lesson-content"> -->
// => <div class="lesson-content">

var htmlInMdRe = /<!-- html-in-md (.+) -->/gi;

module.exports = function() {
  return transfob( function( file, enc, next ) {
    var contents = file.contents.toString();
    contents = contents.replace( htmlInMdRe, function( match, html ) {
      return html;
    });
    file.contents = new Buffer( contents );
    next( null, file );
  });
};
