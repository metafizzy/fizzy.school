var getGlobPaths = require('./utils/get-glob-paths');

var cssSrc = [
  'bower_components/normalize-css/normalize.css',
  'bower_components/flickity/dist/flickity.css',
  'css/fonts.css',
  'css/base.css',
  'modules/*/**/*.css',
];

module.exports = function( site ) {
  site.data.cssPaths = getGlobPaths( cssSrc );
};
