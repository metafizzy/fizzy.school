var transfob = require('transfob');
var path = require('path');

module.exports = function addSlug() {
  return transfob( function( file, enc, next ) {
    file.slug = path.basename( file.path, path.extname( file.path ) );
    next( null, file );
  });
};
