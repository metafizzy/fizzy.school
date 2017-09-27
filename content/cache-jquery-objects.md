---
title: Cache jQuery objects
description: "Learn how to store jQuery selections as variables and re-use those variables around your code."
layout: lesson
problemText: Making the same jQuery selections within functions and across code blocks.
solutionText: Storing jQuery objects as variables so they can be reused.
problemCode: |
  $('.photo-list').on( 'click', 'a', function( event ) {
    // make jQuery selections with each click
    $('.gallery__image').attr( 'src', $( this ).attr('href') );
    $('.gallery__title').text( $( this ).text() );
    $('.gallery__caption').text( $( this ).attr('title') );
  });
resolveCode: |
  // get jQuery objects once
  var $galleryImage = $('.gallery__image');
  var $galleryTitle = $('.gallery__title');
  var $galleryCaption = $('.gallery__caption');

  $('.photo-list').on( 'click', 'a', function( event ) {
    // get clicked element
    var $link = $( this );
    // use cached jQuery objects
    $galleryImage.attr( 'src', $link.attr('href') );
    $galleryTitle.text( $link.text() );
    $galleryCaption.text( $link.attr('title') );
  });
problemCodepen: GmVMWQ
resolveCodepen: qjLWJV
codepenTitle: Photo gallery - cache jQuery objects
codepenHeight: 500
youtubeSlug: sN4QyBIPTv4
---

jQuery's foundational unit is the jQuery selection.

``` js
$('.gallery__title')
```

In and of itself, jQuery selection is perfectly functional piece of code. Its not until we start building actual programs with multiple selections and behaviors that we encounter problems.

Here's a good example. It's a photo gallery controlled by a list of links. Each link has text, an `href` attribute pointing to an image, and a `title` attribute acting as a caption.

``` html
<ul class="photo-list">
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

Clicking a link changes the gallery content. The link text becomes the gallery title, the link's `href` becomes the gallery image's `src`, and the link's `title` becomes the `.gallery__caption` text.

``` js
$('.photo-list').on( 'click', 'a', function( event ) {
  event.preventDefault();
  $('.gallery__title').text( $( this ).text() );
  $('.gallery__image').attr( 'src', $( this ).attr('href') );
  $('.gallery__caption').text( $( this ).attr('title') );
});
```

It's using several jQuery selections and it works just fine. So what's wrong?

To answer that, we need to understand what's going at a granular scale. Let's zoom in just a single jQuery selection:

``` js
$('.gallery__title')
```

This bit of JavaScript uses a CSS selector, but its important to remember, JavaScript and CSS are fundamentally different. This code hides those differences.

That `$` dollar sign actually is not a core JavaScript keyword or syntax. It is a shorthand name of a function, an alias its full name: `jQuery`.

``` js
$ === jQuery
// => true
```

jQuery's code provides two names for its main function, `jQuery` and `$`. The `$` dollar sign is just to save code for convenience

We can rewrite the selection with the `jQuery` name:

``` js
jQuery('.gallery__title')
```

Now this selection code begins to show its true form. It's a function call. The function is `jQuery` and its being called with one argument, a string, `'.gallery__image'`. `jQuery` is the name of the library, but it does not describe what its doing here. Let's rename the `jQuery` function as `getElements` to underscore its purpose:

``` js
getElements('.gallery__image')
```

Each time you make a jQuery selection `$()`, you ask JavaScript to go look at the DOM and return the selected elements.

Let's take another look at the link click code, but this time replacing `$` with `getElements`.

``` js
getElements('.photo-list').on( 'click', 'a', function( event ) {
  getElements('.gallery__title').text( getElements( this ).text() );
  getElements('.gallery__image').attr( 'src', getElements( this ).attr('href') );
  getElements('.gallery__caption').text( getElements( this ).attr('title') );
});
```

This code gets elements on six separate calls. With each click, the same elements are selected over and over again. That's the issue.

We can fix this by storing the jQuery objects as variables.

## jQuery objects

When you make a jQuery selection, it returns a jQuery object. This allows you to immediately chain the selection into a jQuery method like `.text()`.

``` js
// make selection and do
$('.gallery__title').text('Magic hour');
```

But you don't always have to _select and do_. The jQuery object returned by the selection can be stored as a variable. This is also called caching.

``` js
// make selection, set variable
var $galleryTitle = $('.gallery__title');
// do
$galleryTitle.text('Magic hour');
```

I've named the variable `$galleryImage` with an initial `$`. This is just a naming convention, denoting that the variable is a jQuery object. Changing the variable to just `galleryImage` without a `$` works just as well.

Now that we have the jQuery object stored as variable, we don't have to select it again. This allows us to only get elements when necessary and re-use those selected elements throughout our code.

Looking back at the gallery example, `$('.gallery__title')`, `$('.gallery__image')`, `$('.gallery__caption')` can all be pulled out of the click function and set as separate variables. The `$( this )` is different with each click, so its variable `$link` needs to be set within the click event function.

``` js
// get jQuery selections
var $galleryTitle = $('.gallery__title');
var $galleryImage = $('.gallery__image');
var $galleryCaption = $('.gallery__caption');

$('.photo-list').on( 'click', 'a', function( event ) {
  // get clicked element
  var $link = $( this );
  $galleryImage.attr( 'src', $link.attr('href') );
  $galleryTitle.text( $link.text() );
  $galleryCaption.text( $link.attr('title') );
});
```


This technique is especially useful across different functions. Our example also has a reset button click event that uses the same jQuery selections. Multiple functions do not need to re-select the same items. We can use the same cached jQuery object variables.

``` js
// get jQuery selections
var $galleryTitle = $('.gallery__title');
var $galleryImage = $('.gallery__image');
var $galleryCaption = $('.gallery__caption');

$('.photo-list').on( 'click', 'a', function( event ) {
  // get clicked element
  var $link = $( this );
  $galleryTitle.text( $link.text() );
  $galleryImage.attr( 'src', $link.attr('href') );
  $galleryCaption.text( $link.attr('title') );
});

$('.reset-button').click( function() {
  $galleryTitle.text('Photo title');
  $galleryImage.attr( 'src', 'https://dummyimage.com/240x240' );
  $galleryCaption.text('This is the photo caption');
});
```

One note: `$('.photo-list')` and `$('.reset-button')` are not cached as variables because they are only selected and used once.

## Wrap up

Caching jQuery objects is the number one thing I look for when refactoring code. It's not just about a little performance boost. By using jQuery object variables, you demonstrate several key concepts with JavaScript: that the jQuery selection is not magic syntax, but a function call, and that you can store the result of a functions as variables, and those variables can be re-used around your code.

So take another look at your jQuery selections. Any of the same selections that occur multiple times should be moved out and cached as variables. It's an easy improvement, and it can be the first step toward learning an even bigger concept: thinking with variables. More on that in the next lesson: [State variables](state-variables).
