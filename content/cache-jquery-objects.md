---
title: Cache jQuery objects
layout: page
---

<div class="duo">
  <div class="duo__cell">
    <h2>Look out for</h2>
    <p>Making the same jQuery selections within functions and across code blocks.</p>
  </div>
  <div class="duo__cell">
    <h2>Solution</h2>
    <p>Store jQuery objects as variables so they can be reused.</p>
  </div>
</div>

<div class="duo code-compare">
  <div class="duo__cell code-compare__nay">
    ``` js
    $('.gallery-link-list a').click( function( event ) {
      // make jQuery selections with each click
      $('.gallery\__image').attr( 'src', $(this).attr('href') );
      $('.gallery\__title').text( $(this).text() );
      $('.gallery\__caption').text( $(this).attr('title') );
    });
    ```
    <!-- https://codepen.io/desandro/pen/ac902dc40335678393a2c9aef5356c9b -->
  </div>
  <div class="duo__cell code-compare__yay">
    ``` js
    // get jQuery selections once
    var $galleryImage = $('.gallery\__image');
    var $galleryTitle = $('.gallery\__title');
    var $galleryCaption = $('.gallery\__caption');

    $('.gallery-link-list a').click( function( event ) {
      // get clicked element
      var $link = $(this);
      // use cached jQuery objects
      $galleryImage.attr( 'src', $link.attr('href') );
      $galleryTitle.text( $link.text() );
      $galleryCaption.text( $link.attr('title') );
    });
    ```
    <!-- https://codepen.io/desandro/pen/ff6ee1e664ebd2af70cde44f6f8db6fe -->
  </div>
</div>

<!-- html-in-md <div class="lesson-content"> -->

<p data-height="500" data-theme-id="dark" data-slug-hash="ff6ee1e664ebd2af70cde44f6f8db6fe" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="jQuery selections 2" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/ff6ee1e664ebd2af70cde44f6f8db6fe/">jQuery selections 2</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## Benefits

+ Using variables for jQuery objects exposes you to the concept of variables
+ Variables are easier to lint and catch bugs
+ Better performance, removing excess function calls and DOM selecting

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
  ...
</ul>

<div class="gallery">
  <h2 class="gallery__title">Orange tree</h2>
  <img class="gallery__image" src="orange-tree.jpg" />
  <p class="gallery__caption">Pluck an orange from the tree<p>
</div>

<p><button class="reset-button">Reset photo</button></p>
```

This example has a list of links. Each link has an `href` pointing to an image, a `title` with an image's caption, and its text as the image's title. The desired behavior of the gallery is clicking a link will change elements within `gallery` to show the respective image, title, and caption. Clicking a reset button resets the image, caption, and title.

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

This line of code is a standard jQuery pattern: 'select and do.' It's very straightforward: specify an element (or elements), and do something with them. In this case, it's selecting the `.gallery__image` element and setting its `src` attribute to the clicked link's `href` attribute. jQuery's syntax makes this code easy to write. But it does so by hiding some big concepts.

Let's zoom in further, looking at just the jQuery element selection:

``` js
$('.gallery__image')
```

Although jQuery uses CSS selectors to select elements, jQuery and JavaScript are fundamentally different than CSS or HTML. This line of code may look nearly identical to a CSS selection, but it hides features of JavaScript.

That `$` dollar sign is an alias for `jQuery`. We can rewrite the selection:

``` js
jQuery('.gallery__image')
```

Now this selection code begins to show its true form. It's a function call. The function is `jQuery` and its being called with one argument, a string, `'.gallery__image'`. `jQuery` is the name of the library, but it does not describe what its doing here. Let's rename the `jQuery` function as `getElements` to underscore its purpose:

``` js
getElements('.gallery__image')
```

Each time you make a jQuery selection `$()`, you ask JavaScript to go look at the DOM and return the selected elements.

Let's take another look at the link click code, but this time replacing `$` with `getElements`.

``` js
getElements('.gallery-link-list a').click( function( event ) {
  event.preventDefault();
  getElements('.gallery__image').attr( 'src', getElements(this).attr('href') );
  getElements('.gallery__title').text( getElements(this).text() );
  getElements('.gallery__caption').text( getElements(this).attr('title') );
});
```

With each click, this code gets elements on six separate calls. The same elements are selected over and over again. We can reduce this by storing the jQuery objects as variables. 

## jQuery objects

When you make a jQuery selection, it returns a jQuery object. This allows you to immediately chain the selection into a jQuery method like `.attr()`.

``` js
// make selection and do
$('.gallery__image').attr( ... );
```

But you don't always have to _select and do._ The jQuery object returned by the selection can be stored as a variable. This is also called caching.

``` js
// make selection, set variable
var $galleryImage = $('.gallery__image');
// do
$galleryImage.attr( ... );
```

I've named the variable `$galleryImage` with an initial `$`. This is just a naming convention, denoting that the variable is a jQuery object. Changing the variable to just `galleryImage` without a `$` works just as well.

Now that we have the jQuery object stored as variable, we don't have to select it again. This allows us to only get elements when necessary and re-use those selected elements throughout our code.

Rather than selecting the elements on each click, let's select them before any click and use them within the click handler functions.

``` js
// get jQuery selections
var $galleryImage = $('.gallery__image');
var $galleryTitle = $('.gallery__title');
var $galleryCaption = $('.gallery__caption');

$('.gallery-link-list a').click( function( event ) {
  event.preventDefault();
  // get clicked element
  var $link = $(this);
  $galleryImage.attr( 'src', $link.attr('href') );
  $galleryTitle.text( $link.text() );
  $galleryCaption.text( $link.attr('title') );
});

$('.reset-button').click( function() {
  $galleryImage.attr( 'src', 'https://dummyimage.com/240x240' );
  $galleryTitle.text( 'Photo title' );
  $galleryCaption.text( 'This is the photo caption' );
});
```

Two things to note:

**1**: `$link` is set within the link click function, not outside. This is because the value of `this` changes with each click. In that case, it needs to be set on each click. Once set, `$link` is then used multiple times.

**2**: both `$('.gallery-link-list a')` and `$('.reset-button')` have not been stored as a variable. This is because these selections are only used once in the code.

## Wrap up

Caching jQuery selections is a powerful practice. Not only does it expose how jQuery works, it can be the first step to opening an even bigger concept: thinking with variables. More on that in the next chapter: State with variables.

<!-- html-in-md </div> -->
