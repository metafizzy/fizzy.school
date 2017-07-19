---
title: Simplify selectors
layout: lesson
problemText: Complicated selectors that concatenate variables and strings.
solutionText: Using child and filter selecting methods like <code>.find()</code>, <code>.filter()</code>, and <code>.eq()</code>.
problemCode: |
  $('.tab-group').each( function( groupIndex ) {
    var groupNumber = groupIndex + 1;
    // like '.tab-nav2 li.is-active'
    var $activeNavItem = $( '.tab-nav' + groupNumber + ' li.is-active' );
    // like '.tab-content2 .tab.is-active'
    var $activeTab = $( '.tab-content' + groupNumber + ' .tab.is-active' );

    $( '.tab-nav' + groupNumber ).on( 'click', 'a', function( event ) {
      // ...
      // update active tab
      var tabNumber = $navItem.index() + 1;
      // like '.tab-content2 .tab1'
      $activeTab = $( '.tab-content' + groupNumber + ' .tab' + tabNumber );
      $activeTab.addClass('is-active');
    });
  });
solutionCode: |
  $('.tab-group').each( function( groupIndex, group ) {
    // get elements
    var $group = $( group ); // parent group
    var $nav = $group.find('.tab-nav'); // select child nav
    var $activeNavItem = $nav.find('li.is-active'); // select child nav item
    var $tabs = $group.find('.tab'); // select child tabs
    var $activeTab = $tabs.filter('.is-active'); // filter for active tab

    $nav.on( 'click', 'a', function( event ) {
      // ...
      // update active tab
      var tabIndex = $navItem.index();
      $activeTab = $tabs.eq( tabIndex ); // use eq with index
      $activeTab.addClass('is-active');
    })
  });
problemCodePen: 5847902f662647c3d3356fe87d2087fc
solutionCodePen: 58617951bab00eee6b4f311963479704
---

<p data-height="500" data-theme-id="dark" data-slug-hash="58617951bab00eee6b4f311963479704" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="three galleries - simplified selectors" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/58617951bab00eee6b4f311963479704/">three galleries - simplified selectors</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

<!-- html-in-md <div class="skinny-column"> -->

## Benefits

+ Readability: complicated selectors are hard to understand at a glance
+ Portability: separate HTML structure from JS behavior

## Lesson

jQuery makes selecting elements with CSS syntax so approachable, that it obscures the path to learning other features. You may feel encouraged to build dynamic selectors by concatenating variables with selector strings.

``` js
var itemNumber = $navItem.index() + 1;
// select corresponding tab; 2nd item -> '.tab-content .tab2'
$( '.tab-content .tab' + itemNumber );
```

Our initial demo deals with this issue.  It works with three sets of tab groups. Each tab group has a `.tab-nav` navigation list and a `.tab-content` content group.

``` html
<!-- tab-group 1 -->
<div class="tab-group">
  <ul class="tab-nav tab-nav1">...</ul>
  <div class="tab-content tab-content1">...</div>
</div>

<!-- tab-group 2 -->
<div class="tab-group">
  <ul class="tab-nav tab-nav2">...</ul>
  <div class="tab-content tab-content2">...</div>
</div>

...
```

It works by selecting elements via their numbered classes: i.e. `.tab-nav2` is for `.tab-content2`. Building off of the [`.each()` function pattern](un-repeat-with-functions), selectors are constructed with by concatenating a number variable with a selector string.

``` js
$('.tab-group').each( function( groupIndex ) {
  var groupNumber = groupIndex + 1;
  // like '.tab-nav2 li.is-active'
  var $activeNavItem = $( '.tab-nav' + groupNumber + ' li.is-active' );
  // like '.tab-content2 .tab.is-active'
  var $activeTab = $( '.tab-content' + groupNumber + ' .tab.is-active' );

  $( '.tab-nav' + groupNumber ).on( 'click', 'a', function( event ) {
    // ...
    // update active tab
    var tabNumber = $navItem.index() + 1;
    // like '.tab-content2 .tab1'
    $activeTab = $( '.tab-content' + groupNumber + ' .tab' + tabNumber );
    $activeTab.addClass('is-active');
  });
});
```

We can improve this code by refactoring these complicated selectors. Rather than using the selector string to do all the work, we can leverage selecting parent and child elements.

``` js
// get 2nd nav & active item with selector strings only
var $nav = $('.tab-nav');
var $activeNavItem = $('.tab-nav li.is-active');
```

``` js
// get nav
var $nav = $('.tab-nav');
// get active item from parent
var $activeNavItem = $nav.find('li.is-active');
```

These two blocks of code are functionally the same. They both get the same elements. But the second block is more explicit in its purpose. By selecting from `$nav`, it's clear that `$activeNavItem` is a child element selection. You do not have to visually compare their selector strings to understand their relationship.

Selecting from parent elements & multiple elements is especially useful working in functions, where behavior is already abstracted. Instead of creating unique selector strings, you can start working off the element's document structure.

Let's see this technique in use with the example.

``` js
$('.tab-group').each( function( groupIndex, group ) {
  // get elements
  var $group = $( group ); // parent group
  var $nav = $group.find('.tab-nav'); // select child nav
  var $activeNavItem = $nav.find('li.is-active'); // select child nav item
  var $tabs = $group.find('.tab'); // select child tabs
  var $activeTab = $tabs.filter('.is-active'); // filter for active tab

  $nav.on( 'click', 'a', function( event ) {
    // ...
    // update active tab
    var tabIndex = $navItem.index();
    $activeTab = $tabs.eq( tabIndex ); // use eq with index
    $activeTab.addClass('is-active');
  })
});
```

`.find()` is used select child elements. `.filter()` and `.eq()` are used to filter a set of elements to a single element.

This code removes all reference to the numbered classes. Not only are number classes from the JS code, you can remove numbered classes in the HTML as well.

``` html
<!-- tab-group 1 -->
<div class="tab-group">
  <ul class="tab-nav">...</ul>
  <div class="tab-content">...</div>
</div>

<!-- tab-group 2 -->
<div class="tab-group">
  <ul class="tab-nav">...</ul>
  <div class="tab-content">...</div>
</div>

...
```

## Wrap up

Removing complicated selectors makes for simpler code, but also opens up a new way to think about how to work with elements by utilizing their document structure.

<!-- </div> -->

