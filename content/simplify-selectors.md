---
title: Simplify selectors
layout: lesson
problemText: Complicated selectors that concatenate variables and strings.
solutionText: Using child and filter selecting methods like <code>.find()</code>, <code>.filter()</code>, and <code>.eq()</code>.
problemCode: |
  $('.gallery').each( function( index ) {
    var number = index + 1;
    var $nav = $('.gallery__nav' + number );
    var $activeTab = $('.gallery__tab-container' + number +
      ' .gallery__tab.is-active');
  });
solutionCode: |
  $('.gallery').each( function( index, gallery ) {
    var $gallery = $( gallery );
    var $nav = $gallery.find('.gallery__nav');
    var $tabs = $gallery.find('.gallery__tab');
    var $activeTab = $tabs.filter('.is-active');
  });
problemCodePen: 5847902f662647c3d3356fe87d2087fc
solutionCodePen: 58617951bab00eee6b4f311963479704
---

<p data-height="500" data-theme-id="dark" data-slug-hash="58617951bab00eee6b4f311963479704" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="Three galleries - simplified selectors" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/58617951bab00eee6b4f311963479704/">Three galleries - simplified selectors</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

<!-- html-in-md <div class="skinny-column"> -->

## Lesson

jQuery makes selecting elements with CSS syntax so approachable, that it obscures the path to learning other features.

Let's look at an example. It has three galleries. Each gallery has a `.gallery__nav` navigation list, `.gallery__tab-container`, and tab container has tabs.

``` html
<!-- gallery 1 -->
<div class="gallery">
  <ul class="gallery__nav gallery__nav1">...</ul>

  <div class="gallery__tab-container gallery__tab-container1">
    <div class="gallery__tab is-active">...</div>
    <div class="gallery__tab">...</div>
    <div class="gallery__tab">...</div>
    ...
  </div>
</div>

<!-- gallery 2 -->
<div class="gallery">
  <ul class="gallery__nav gallery__nav2">...</ul>

  <div class="gallery__tab-container gallery__tab-container2">
    <div class="gallery__tab is-active">...</div>
    <div class="gallery__tab">...</div>
    <div class="gallery__tab">...</div>
    ...
  </div>
</div>

...
```

The end goal is to be able to click a nav item to change the tab and display the clicked nav item as active, for all three tab groups.

Let's code up some JavaScript! So we already know to [use a function so we don't repeat code](un-repeat-with-functions). We'll start by selecting all `.gallery` elements and calling each on that.

``` js
$('.gallery).each( function() {
  // ...
});
```

Now then, how do we go about selecting each gallery's nav and active tab?

If you're well-accostumed to selecting elements with CSS selector strings, you build a selector string. So you may add numbered classes in the HTML. The first gallery gets `gallery__nav1` and `gallery__tab-container1`. Second gallery gets `gallery__nav2` `tab__container2`, as so forth

Then back in the JavaScript, you could build the selector string by combining a variable with a string, using the index argument from the each function

``` js
$('.gallery').each( function( index ) {
  var number = index + 1;
  var $nav = $('.gallery__nav' + number );
  var $activeTab = $('.gallery__tab-container' + number +
    ' .gallery__tab.is-active');
});
```

These selectors work, but they're hard to read. Looking at them, you have to take a second to figure out how the variable works in the string. And this code hits upon a familiar problem: its relying on specific classes in the HTML. We already know that that the nav and activeTab elements exist with the group element. Using numbered classes is a hack.

Let's fix this by removing these complicated selectors, and making use of the elements document structure.

``` js
$('.gallery').each( function( index, gallery ) {
  var $gallery = $( gallery );
  var $nav = $gallery.find('.gallery__nav');
  var $activeTab = $gallery.find('.gallery__tab.is-active');
});
```

We'll start out by creating a jQuery object variable for the parent `gallery` element with the each function's second argument. Now we can use [jQuery's `find` method](https://api.jquery.com/find/) to select the `$nav` element within the parent `gallery` element. Same thing for the `$activeTab`.

We're still using selector strings, but because we are selecting within the parent element, we don't need to use the numbered classes. At a glance, you can understand the relationship between these elements looking at the code. `$nav` and `$activeTab` are child elements within `$gallery`.

Let's keep using this concept to get the other elements used for this example's behavior. We'll find `$activeNavItem` from `$nav`. Find `$tabs` from `$gallery`. Now that we have a `$tabs` selection, we can get `$activeTab` by using the [`filter` method](https://api.jquery.com/filter/) to select the one tab element that has the `is-active` class.

``` js
$('.gallery').each( function( index, gallery ) {
  var $gallery = $( gallery );
  var $nav = $gallery.find('.gallery__nav');
  var $activeNavItem = $nav.find('li.is-active');
  var $tabs = $gallery.find('.gallery__tab');
  var $activeTab = $tabs.filter('.is-active');
  
  $nav.on( 'click', 'li', function( event ) {
    // update active tab & nav item...
  });
});
```

Okay, now we have the elements to build out the nav click behavior.  We'll update the active tab and nav item using our [jQuery objects variables](cache-jquery-objects).

``` js
$nav.on( 'click', 'li', function( event ) {
  event.preventDefault();
  var $navItem = $( event.currentTarget );
  // update active nav item
  $activeNavItem.removeClass('is-active');
  $activeNavItem = $navItem.addClass('is-active');
  // update active tab
  $activeTab.removeClass('is-active');
  $activeTab // = ???
});
```

How do we select the new `$activeTab`? With the old way, you could build a big selector string. Adding numbered classes for each tab in HTML, then combining the number for the gallery with the number for the tab in the JS.

``` js
var tabNumber = $navItem.index() + 1; // 1,2,3...
$activeTab = $( '.gallery__tab-content' + number +
  ' .gallery__tab' + tabNumber );
```

But, we know better. We can select the tab from the `tabs` variable using another jQuery method, [`eq()`](https://api.jquery.com/filter/eq/).

``` js
var tabIndex = $navItem.index(); // 0,1,2...
$activeTab = $tabs.eq( tabIndex );
```

And it works! We're able to click a gallery's navigation to change its visible tab and active nav item.

---

Methods like `filter()`, `find()`, and `eq()` are [jQuery Traversing methods](https://api.jquery.com/category/traversing/). They allow you to move around the DOM via selections, working with one selection to return a new one.

With traversing methods, you don't have to build complicated selector strings with numbered classes. Instead, you can traverse an elements document structure, thus simplifying your code.

Not only can you remove numbered classes from the JS, you can remove them from  the HTML as well.

<!-- html-in-md </div> -->

<div class="duo">
  <div class="duo__cell">
    <p>Initial code required numbered classes in HTML</p>
    ``` html
    <!-- gallery 1 -->
    <div class="gallery">
      <ul class="gallery\__nav gallery\__nav1">...</ul>
      <div class="gallery\__tab-container gallery\__tab-container1">
        <div class="gallery\__tab gallery\__tab1">...</div>
        <div class="gallery\__tab gallery\__tab2">...</div>
        <div class="gallery\__tab gallery\__tab3">...</div>
      </div>
    </div>

    <!-- gallery 2 -->
    <div class="gallery">
      <ul class="gallery\__nav gallery\__nav2">...</ul>
      <div class="gallery\__tab-container gallery\__tab-container2">
        <div class="gallery\__tab gallery\__tab1">...</div>
        <div class="gallery\__tab gallery\__tab2">...</div>
        <div class="gallery\__tab gallery\__tab3">...</div>
      </div>
    </div>

    ...
    ```
  </div>
  <div class="duo__cell">
    <p>Numbered classes not needed using selector methods.</p>
    ``` html
    <!-- gallery 1 -->
    <div class="gallery">
      <ul class="gallery\__nav">...</ul>
      <div class="gallery\__tab-container">
        <div class="gallery\__tab">...</div>
        <div class="gallery\__tab">...</div>
        <div class="gallery\__tab">...</div>
      </div>
    </div>

    <!-- gallery 2 -->
    <div class="gallery">
      <ul class="gallery\__nav">...</ul>
      <div class="gallery\__tab-container">
        <div class="gallery\__tab">...</div>
        <div class="gallery\__tab">...</div>
        <div class="gallery\__tab">...</div>
      </div>
    </div>

    ...
    ```
  </div>
</div>

<!-- html-in-md <div class="skinny-column"> -->

## Wrap up

So watch out for numbered classes. They may seem like a suitable solution for selecting elements within functions, but you don't need them. You have already learned to cache your jQuery objects. This concept just builds upon that, taking those selections and creating new ones from them with traversing methods.

<!-- html-in-md </div> -->
