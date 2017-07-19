var highlightjs = require('highlight.js');
var transfob = require('transfob');

highlightjs.configure({
  classPrefix: 'hl-'
});

var hljsJavaScript = highlightjs.getLanguage('javascript');

hljsJavaScript.contains.push({
  className: 'jquery-var',
  begin: /\$\w+/,
});

var reFirstLine = /.*\n/;

function replaceCodeBlock( match, leadingWhiteSpace, block ) {
  var langMatch = block.match( reFirstLine );
  var language = langMatch && langMatch[0];
  // remove first line
  block = block.replace( reFirstLine, '' );
  if ( language ) {
    language = language.trim();
  }
  // remove leading whitespace from code block
  if ( leadingWhiteSpace && leadingWhiteSpace.length ) {
    var reLeadingWhiteSpace = new RegExp( '^' + leadingWhiteSpace, 'gim' );
    block = block.replace( reLeadingWhiteSpace, '' );
  }
  // highlight code
  var highlighted = language ? highlightjs.highlight( language, block, true ).value : block;

  // wrap in <code>
  var html = '\n<pre><code' +
    ( language ? ' class="' + language + '"' : '' ) + '>' +
    highlighted + '</code></pre>';
  return html;
}

module.exports = function() {
  return transfob( function( file, enc, next ) {
    var contents = file.contents.toString();
    contents = contents.replace( /\n( *)```([^```]+)```/gi, replaceCodeBlock );
    file.contents = new Buffer( contents );
    next( null, file );
  });
};
