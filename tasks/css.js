var getGlobPaths = require('./utils/get-glob-paths');

var cssSrc = [
  'css/normalize.css',
  'css/fonts.css',
  'css/base.css',
  'modules/*/**/*.css',
];

module.exports = function( site ) {
  site.data.cssPaths = getGlobPaths( cssSrc );
};
