// change theme when logo is clicked

( function() {

var siteTheme;
var localTheme = localStorage.getItem('theme');
localTheme = localTheme || 'dark';
updateTheme( localTheme );

function updateTheme( theme ) {
  if ( siteTheme ) {
    document.documentElement.classList.remove( 'theme--' + siteTheme );
  }
  localStorage.setItem( 'theme', theme );
  document.documentElement.classList.add( 'theme--' + theme );
  siteTheme = theme;
}

// ----- logo click ----- //

FizzySchool['witchie-logo'] = function( elem ) {

  var isDark = siteTheme == 'dark';
  var labelTheme = elem.querySelector('.witchie-logo__label__theme');
  labelTheme.textContent = isDark ? 'light' : 'dark';

  elem.addEventListener( 'click', function() {
    isDark = !isDark;
    var theme = isDark ? 'dark' : 'light';
    updateTheme( theme );
    labelTheme.textContent = isDark ? 'light' : 'dark';
  });

};

})();
