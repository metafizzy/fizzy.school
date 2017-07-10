var transfob = require('transfob');

// add handlebars layouts syntax to use page layout template
module.exports = function() {
  return transfob( function( file, enc, next ) {
    var contents = file.contents.toString();
    // use layout set in YAML front matter
    var layout = file.data.page.layout;
    contents = '{{#extend "' + layout + '"}}{{#content "main"}}' +
      contents + '{{/content}}{{/extend}}';
    file.contents = new Buffer( contents );
    next( null, file );
  });
};
