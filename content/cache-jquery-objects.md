---
title: Caching jQuery objects
layout: page
---

<div class="duo code-compare">
  <div class="duo__cell code-compare__nay">
    <h2>Watch out for</h2>
    <p>Making the same jQuery selections with <code>$('selector')</code>  within functions and across code blocks.</p>
    ``` js
    $('.gallery-link-list a').click( function( event ) {
      event.preventDefault();
      $('.gallery\__image').attr( 'src', $(this).attr('href') );
      $('.gallery\__title').text( $(this).text() );
      $('.gallery\__caption').text( $(this).attr('title') );
    });

    $('.reset-button').click( function() {
      $('.gallery\__image').attr( 'src', 'https://dummyimage.com/240x240' );
      $('.gallery\__title').text('Photo title');
      $('.gallery\__caption').text('This is the photo caption');
    });
    ```
    https://codepen.io/desandro/pen/ac902dc40335678393a2c9aef5356c9b
  </div>
  <div class="duo__cell code-compare__yay">
    <h2>The fix</h2>
    <p>Store jQuery objects as variables so they can be reused.</p>
    ``` js
    // get jQuery selections
    var $galleryImage = $('.gallery\__image');
    var $galleryTitle = $('.gallery\__title');
    var $galleryCaption = $('.gallery\__caption');

    $('.gallery-link-list a').click( function( event ) {
      event.preventDefault();
      // get clicked element
      var $clickedLink = $(this);
      $galleryImage.attr( 'src', $clickedLink.attr('href') );
      $galleryTitle.text( $clickedLink.text() );
      $galleryCaption.text( $clickedLink.attr('title') );
    });

    $('.reset-button').click( function() {
      $galleryImage.attr( 'src', 'https://dummyimage.com/240x240' );
      $galleryTitle.text( 'Photo title' );
      $galleryCaption.text( 'This is the photo caption' );
    });
    ```
  </div>
</div>

<!-- html-in-md <div class="lesson-content"> -->

## Lesson

Caching jQuery objects is the first thing I look for when refactoring front-end JavaScript. It is easy to implement, but more importantly, it opens the door to understanding several key facets about how JavaScript works.

Let's use a photo gallery example:

``` html
<ul class="gallery-link-list">
  <li><a href="cat-nose.jpg"
         title="Close up cat nose">Cat</a></li>
  <li><a href="contrail.jpg"
         title="Passing overhead we sailed into tomorrow">Contrail</a></li>
  <li><a href="drizzle.jpg"
         title="I heard the rain wash the streets">Drizzle</a></li>
  <li><a href="grapes.jpg"
         title="Oh the grapes, they had so much WRATH">Grapes</a></li>
  <li><a href="orange-tree.jpg"
         title="Pluck an orange from the tree">Orange tree</a></li>
  <li><a href="shore.jpg"
         title="Approaching the shoreline, waiting for the tide">Shore</a></li>
  <li><a href="submerged.jpg"
         title="Beneath the waves he could still hear them calling">Submerged</a></li>
  <li><a href="tulip.jpg"
         title="A present from a dewey morning">Tulip</a></li>
  <li><a href="van.jpg"
         title="Get in. I'll explain when we're on the road.">Van</a></li>
</ul>

<div class="gallery">
  <h2 class="gallery__title">Orange tree</h2>
  <img class="gallery__image" src="orange-tree.jpg" />
  <p class="gallery__caption">Pluck an orange from the tree<p>
</div>

<p><button class="reset-button">Reset photo</button></p>
```

This example has a list of links. Each link has an `href` pointing to an image, a `title` with an image's caption, and its text as the image's title. The desired behavior of the gallery is clicking a link will change elements within `gallery` to show the respective image, title, and caption. Clicking a link will also changed the respective `li` to `is-selected` There's also a reset button that sets a separate set of image, title, and caption. Our initial JavaScript is thus:

``` js
$('.gallery-link-list a').click( function( event ) {
  event.preventDefault();
  $('.gallery__image').attr( 'src', $(this).attr('href') );
  $('.gallery__title').text( $(this).text() );
  $('.gallery__caption').text( $(this).attr('title') );
});

$('.reset-button').click( function() {
  $('.gallery__image').attr( 'src', 'https://dummyimage.com/240x240' );
  $('.gallery__title').text( 'Photo title' );
  $('.gallery__caption').text( 'This is the photo caption' );
});
```

First, it must be said, it works! Indeed, it works just fine. So what's wrong?

To answer that, we need to understand what's going at a granular scale. Let's zoom in on this line:

``` js
$('.gallery__image').attr( 'src', $(this).attr('href') );
```

This line of code is a standard jQuery pattern: 'select and do.' It's very straightforward: specify an element (or elements), and do something with them. In this case, it's selecting the `.gallery__image` element and setting its `src` attribute to the clicked link's `href` attribute. jQuery's syntax makes this code a thing of a beauty. But it does so by hiding some big concepts.

---

Let's zoom in further, to just the jQuery element selection:

``` js
$('.gallery__image')
```

Although jQuery uses CSS selectors to select elements, jQuery and JavaScript are fundamentally different than CSS or HTML. This line of code may look nearly identical to a CSS selection, but it works differently.

That `$` dollar sign is an alias for `jQuery`. We can rewrite the selection:

``` js
jQuery('.gallery__image')
```

Now this selection code begins to show its true form. It's a function call. The function is `jQuery` and its being called with one argument, a string, `'.gallery__image`. `jQuery` is the name of the library, but it does not describe what its doing here. Let's rename the `jQuery` function as `getElements`:

``` js
getElements('.gallery__image')
```

Each time you use a jQuery selection `$()`, you asking JavaScript to go look at the DOM and return the selected elements. Let's take another look at the link click code, but this time replacing `$` with `getElements` for clarity.

``` js
getElements('.gallery-link-list a').click( function( event ) {
  event.preventDefault();
  getElements('.gallery__image').attr( 'src', getElements(this).attr('href') );
  getElements('.gallery__title').text( getElements(this).text() );
  getElements('.gallery__caption').text( getElements(this).attr('title') );
});
```

Each click, this code gets elements on six separate selections. We can reduce this by storing the jQuery selections as variables.

---

When you make a jQuery selection, it returns a jQuery object. This allows you to immediately chain the selection into a jQuery method like `.attr()`.

``` js
// make selection and do
$('.gallery__image').attr( ... );
```

But you don't always have to _select and do._ The jQuery object returned by the selection can be stored as a variable, also called caching.

``` js
// make selection, set variable
var $galleryImage = $('.gallery__image');
// do
$galleryImage.attr( ... );
```

This allows us to only get elements when necessary and re-use those selected elements throughout our code. Rather than selecting the elements on each click, let's select them before any click and use them within the click handler functions.

``` js
// get jQuery selections
var $galleryImage = $('.gallery__image');
var $galleryTitle = $('.gallery__title');
var $galleryCaption = $('.gallery__caption');

$('.gallery-link-list a').click( function( event ) {
  event.preventDefault();
  // get clicked element
  var $clickedLink = $(this);
  $galleryImage.attr( 'src', $clickedLink.attr('href') );
  $galleryTitle.text( $clickedLink.text() );
  $galleryCaption.text( $clickedLink.attr('title') );
});

$('.reset-button').click( function() {
  $galleryImage.attr( 'src', 'https://dummyimage.com/240x240' );
  $galleryTitle.text( 'Photo title' );
  $galleryCaption.text( 'This is the photo caption' );
});
```

---

Two things to note:

**1**: `$clickedLink` is set within the link click function, not outside. This is because the value of `this` changes with each click. In that case, it needs to be set on each click. Once set as `$clickedLink`, it's then re-used to change the three elements.

**2**: both `$('.gallery-link-list a')` and `$('.reset-button')` have not been stored as a variable. This is because these selections are only used once in the code.

## Wrap up

Caching jQuery selections is a powerful practice. Not only does it expose how jQuery works, it can be the first step to opening an even bigger concept: thinking with variables. More on that in the next chapter: State with variables.

<!-- html-in-md </div> -->
