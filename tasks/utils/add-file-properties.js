var transfob = require('transfob');
var path = require('path');

// add handlebars layouts syntax to use page layout template
module.exports = function() {
  return transfob( function( file, enc, next ) {
    var extname = path.extname( file.path );
    file.slug = path.basename( file.path, extname );
    file.url = path.relative( file.cwd + '/content/', file.path )
      .replace( extname, '' );
    // rootPath
    if ( file.data.page.is404 ) {
      file.rootPath = '/';
    } else {
      file.rootPath = path.relative( file.path, file.cwd + '/content/' )
        .replace( /\.\.$/, '' );
    }
    next( null, file );
  });
};
