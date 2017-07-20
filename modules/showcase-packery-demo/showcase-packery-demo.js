/* globals Packery, Draggabilly */

FizzySchool['showcase-packery-demo'] = function( elem ) {

  var grid = elem.querySelector('.showcase-packery-demo__grid');

  var pckry = new Packery( grid, {
    itemSelector: '.showcase-packery-demo__grid__item',
    columnWidth: '.showcase-packery-demo__grid__sizer',
    rowHeight: '.showcase-packery-demo__grid__sizer',
    gutter: 5,
    percentPosition: true
  });

  var draggie = new Draggabilly('.showcase-packery-demo__grid__item--draggable');

  pckry.bindDraggabillyEvents( draggie );

};
