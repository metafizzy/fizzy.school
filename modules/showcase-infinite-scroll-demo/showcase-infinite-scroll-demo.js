/* globals InfiniteScroll */

FizzySchool['showcase-infinite-scroll-demo'] = function( elem ) {

  var infScroll = new InfiniteScroll( elem, {
    path: 'page{{#}}', // hack
    scrollThreshold: 200,
    elementScroll: true,
    history: false,
    loadOnScroll: false
  });

  var fragment = document.createDocumentFragment();

  var pageIndex = 1;

  infScroll.on( 'scrollThreshold', function() {
    pageIndex++;
    createItem('a');
    createItem('b');
    createItem('c');
    createItem('d');
    elem.appendChild( fragment );
  });

  function createItem( letter ) {
    var item = document.createElement('div');
    item.className = 'showcase-infinite-scroll-demo__item';
    item.textContent = pageIndex + letter;
    fragment.appendChild( item );
  }

};
