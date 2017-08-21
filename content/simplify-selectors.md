---
title: Simplify selectors
layout: lesson
problemText: Complicated selectors that concatenate variables and strings.
solutionText: Using child and filter selecting methods like <code>.find()</code>, <code>.filter()</code>, and <code>.eq()</code>.
problemCode: |
  $('.tab-group').each( function( groupIndex ) {
    // get elements with selectors
    var groupNumber = groupIndex + 1;
    var $nav = $( '.tab-nav' + groupNumber );
    var $activeTab = $( '.tab-content' + groupNumber + ' .tab.is-active' );
  });
solutionCode: |
  $('.tab-group').each( function( groupIndex, group ) {
    // get elements from parent group
    var $group = $( group );
    // select children using .find() & .filter()
    var $nav = $group.find('.tab-nav');
    var $tabs = $group.find('.tab');
    var $activeTab = $tabs.filter('.is-active');
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

jQuery makes selecting elements with CSS syntax so approachable, that it obscures the path to learning other features.

Let's look at an example. It works with three sets of tab groups. Each tab group has a `.tab-nav` navigation list and a `.tab-content` content group with `.tab`s inside.

``` html
<!-- tab-group 1 -->
<div class="tab-group">
  <ul class="tab-nav tab-nav1">...</ul>
  <div class="tab-content tab-content1">
    <div class="tab tab1">...</div>
    <div class="tab tab2">...</div>
    <div class="tab tab3">...</div>
  </div>
</div>

<!-- tab-group 2 -->
<div class="tab-group">
  <ul class="tab-nav tab-nav2">...</ul>
  <div class="tab-content tab-content2">
    <div class="tab tab1">...</div>
    <div class="tab tab2">...</div>
    <div class="tab tab3">...</div>
  </div>
</div>

...
```

Previously, we learned to use [functions to un-repeat code](un-repeat-with-functions).

``` js
// get separate variables
var $tabContent1 = $('.tab-content1');
var $tabContent2 = $('.tab-content2');
var $tabContent3 = $('.tab-content3');
```

Using `.each()`, you may feel encouraged to build selectors by concatenating variables with selector strings.

``` js
$('.tab-group').each( function( groupIndex ) {
  var groupNumber = groupIndex + 1;
  var $tabContent = $( '.tab-content' + groupNumber );
});
```

The initial example code uses this pattern. Selectors are constructed with by concatenating a number variable with a selector string.

``` js
$('.tab-group').each( function( groupIndex ) {
  var groupNumber = groupIndex + 1;
  // like '.tab-nav1 li.is-active'
  var $activeNavItem = $( '.tab-nav' + groupNumber + ' li.is-active' );
  // like '.tab-content1 .tab.is-active'
  var $activeTab = $( '.tab-content' + groupNumber + ' .tab.is-active' );
  // ...
});
```

We can improve this code by refactoring these complicated selectors. Rather than using the selector string to do all the work, we can leverage selecting parent and child elements.

``` js
$('.tab-group').each( function( groupIndex, group ) {
  // get elements from parent group
  var $group = $( group );
  // select from children with .find() & .filter()
  var $nav = $group.find('.tab-nav');
  var $activeNavItem = $nav.find('li.is-active');
  var $tabs = $group.find('.tab');
  var $activeTab = $tabs.filter('.is-active');
  // ...
});
```

This code block works just the same as the previous. They both get the same elements. But the second block is more explicit in its purpose.  By selecting from `$group`, it's clear that `$nav` is a child element selection. You do not have to visually compare their selector strings to understand their relationship.

Selecting from parent elements & multiple elements is especially useful with functions, where behavior is already abstracted. Instead of creating unique selector strings, you can start working off the element's document structure. [`.find()`](https://api.jquery.com/find/) is used select child elements. [`.filter()`](https://api.jquery.com/filter/) and [`.eq()`](https://api.jquery.com/eq/) are used to filter a set of elements to a single element.

Let's look at the click handler code. The previous code uses a complicated selector string to select `$activeTab`.

``` js
$( '.tab-nav' + groupNumber ).on( 'click', 'a', function( event ) {
  // ...
  var tabNumber = $navItem.index() + 1;
  $activeTab = $( '.tab-content' + groupNumber + ' .tab' + tabNumber );
  $activeTab.addClass('is-active');
});
```

We can select from [jQuery object variables](cache-jquery-objects) `$nav` and `$tabs` to simplify this code.

``` js
$nav.on( 'click', 'a', function( event ) {
  // ...
  var tabIndex = $navItem.index();
  $activeTab = $tabs.eq( tabIndex );
  $activeTab.addClass('is-active');
});
```

Selecting `$activeTab` no longer requires combining number variables into a selector string. 

This code removes all reference to the numbered classes. Not only are number classes from the JS code, you can remove numbered classes in the HTML as well.

<!-- html-in-md </div> -->

<div class="duo">
  <div class="duo__cell">
    <p>Initial code required numbered classes in HTML</p>
    ``` html
    <!-- tab-group 1 -->
    <div class="tab-group">
      <ul class="tab-nav tab-nav1">...</ul>
      <div class="tab-content tab-content1">
        <div class="tab tab1">...</div>
        <div class="tab tab2">...</div>
        <div class="tab tab3">...</div>
      </div>
    </div>

    <!-- tab-group 2 -->
    <div class="tab-group">
      <ul class="tab-nav tab-nav2">...</ul>
      <div class="tab-content tab-content2">
        <div class="tab tab1">...</div>
        <div class="tab tab2">...</div>
        <div class="tab tab3">...</div>
      </div>
    </div>

    ...
    ```
  </div>
  <div class="duo__cell">
    <p>Numbered classes not needed using selector methods.</p>
    ``` html
    <!-- tab-group 1 -->
    <div class="tab-group">
      <ul class="tab-nav">...</ul>
      <div class="tab-content">
        <div class="tab">...</div>
        <div class="tab">...</div>
        <div class="tab">...</div>
      </div>
    </div>

    <!-- tab-group 2 -->
    <div class="tab-group">
      <ul class="tab-nav">...</ul>
      <div class="tab-content">
        <div class="tab">...</div>
        <div class="tab">...</div>
        <div class="tab">...</div>
      </div>
    </div>

    ...
    ```
  </div>
</div>

<!-- html-in-md <div class="skinny-column"> -->

## Wrap up

Removing complicated selectors makes for simpler code, but also opens up a new way to think about how to work with elements by utilizing their document structure.

<!-- html-in-md </div> -->

