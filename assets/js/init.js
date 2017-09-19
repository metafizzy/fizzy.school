( function() {

// init all modules, based on their data-js attribute
var jsModuleElems = document.querySelectorAll('[data-js]');
for ( var i=0; i < jsModuleElems.length; i++ ) {
  var moduleElem = jsModuleElems[i];
  var moduleName = moduleElem.getAttribute('data-js');
  var module = FizzySchool[ moduleName ];
  if ( module ) {
    module( moduleElem );
  }
}

})();
