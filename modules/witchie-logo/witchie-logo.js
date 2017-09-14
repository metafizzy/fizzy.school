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

var logo = document.querySelector('.witchie-logo');

if ( !logo ) {
  return;
}

var isDark = siteTheme == 'dark';
var labelTheme = logo.querySelector('.witchie-logo__label__theme');
labelTheme.textContent = isDark ? 'light' : 'dark';

logo.addEventListener( 'click', function() {
  isDark = !isDark;
  var theme = isDark ? 'dark' : 'light';
  updateTheme( theme );
  labelTheme.textContent = isDark ? 'light' : 'dark';
});

})();
