---
title: "Replace jQuery's this"
description: "jQuery's this seems convienent, but leads to quirky code. We can side-step issues  by replacing it."
layout: lesson
problemText: jQuery's <code>this</code> in <code>.each()</code> and event functions.
solutionText: Using <code>.each()</code> element argument and <code>event.currentTarget</code>
problemCode: |
  // 'this' used twice for two different elements
  $('.button-row').each( function() {
    // 'this' 1
    var $buttonRow = $( this );
    var $activeButton = $buttonRow.find('.button.is-active');

    $buttonRow.on( 'click', '.button', function() {
      $activeButton.removeClass('is-active');
      // 'this' 2
      $activeButton = $( this );
      $activeButton.addClass('is-active');
    });
  });
solutionCode: |
  // replacing 'this'
  $('.button-row').each( function( i, buttonRow ) {
    // .each() element argument
    var $buttonRow = $( buttonRow );
    var $activeButton = $buttonRow.find('.button.is-active');

    $buttonRow.on( 'click', '.button', function( event ) {
      $activeButton.removeClass('is-active');
      // event.currentTarget
      $activeButton = $( event.currentTarget );
      $activeButton.addClass('is-active');
    });
  });
problemCodePen: 483afa257e21af6be748a84257562576
solutionCodePen: c713d68c0d6c21131635d98ac3bf76fb
---

<!-- html-in-md <div class="skinny-column"> -->

## Lesson

In the [previous lesson on functions](un-repeat-with-functions), we used `this` within both the `.each()` and event callback functions. In these contexts, jQuery provides `this` as a convienent keyword for individual elements being acted upon. As you continue to write jQuery, you grow so accostumed to using `this`, that you might not realize how weird it is.

Within the initial example code, `this` represents two different sets of elements. Because the intial example uses [jQuery object variables](cache-jquery-objects), we can better recognize these elements as `$buttonRow` and `$activeButton`. Writing the example without variables, we can see how confusing `this` appears.

``` js
$('.button-row').each( function() {
  var $activeButton = $( this ).find('.button.is-active');

  $( this ).on( 'click', '.button', function() {
    $activeButton.removeClass('is-active');
    $activeButton = $( this );
    $( this ).addClass('is-active');
  });
});
```

Reading this code, it's hard to decipher what `$( this )` signifies. It seems like every use of `this` represents the same thing. But we know that not to be true.

## What is this?

`this` is both a bad part and good part of JavaScript. It is a powerful keyword, but easily confused.

`this` is meant to be self-referential. `this` is the way for objects to get, set, and use their own properties and methods. Ideally the `this` keyword would be `self`, which better represents its typical usage.

The ideal case for `this` is within classes. (By _classes_, I mean a custom type of object created by a developer, not `class` used in HTML or CSS.)

``` js
function Vector( x, y ) {
  this.x = x;
  this.y = y;
}

Vector.prototype.add = function( vec ) {
  this.x += vec.x;
  this.y += vec.y;
};

Vector.prototype.log = function() {
  console.log( this.x, this.y );
};
```

In the above code for a `Vector` class, its `x` and `y` properties are accessed across methods via `this`. You don't need to understand the above `Vector` code. Just know that the above code is an appropriate use of `this`. 

The problem with `this` is that is has other uses. `this` has a different meaning depending on its surrounding code. In order to understand what `this` is, you need to look at its _context_.

(In the same manner, the mercurial of nature of `this` makes it dynamic. By enabling object to reference themselves, you can create functions and methods that are independent of the object's code. But that's a lesson for another day.)

Consider these four uses of `this`:

``` js
// global object
console.log( this );
// => window

// object method
var obj = {
  log: function() {
    console.log( this );
    // => {Object}
  }
};

// jQuery event listener
$('.button-row').on( 'click', 'button', function() {
  console.log( this );
  // => <button> element
});

// jQuery plugin
$.fn.log = function() {
  console.log( this );
  // => {jQuery} object
};
```

Each use has a different context. And there are other contexts that affect `this`. For a brief overview of `this`, see [This in JavaScript](https://zellwk.com/blog/this/) by Zell Liew. For an in-depth analysis, read [You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes) by Kyle Simpson.

Of these four uses, the jQuery event listener is the least similar. In that context, `this` doesn't reference itself, the `$('.button-row')` jQuery object. Rather, it references a separate element. This behavior in jQuery was taken from vanilla JavaScript's use of `this` in vanilla event listeners.

``` js
var buttonRow = document.querySelector('.button-row');
buttonRow.addEventListener( 'click', function() {
  console.log( this );
  // => <div class="button-row"> element
});
```

This is all to say that jQuery's use of `this` in event listeners and `.each()` is not improper, but it is quirky. It doesn't have the similar meaning of _self_, but a special meaning that's particular to one small facet of browser JavaScript.

We can allievate ourselves from the quirkiness of jQuery's `this` by using other jQuery features.

## .each() element argument

[`.each()` provides two arguments for its function](http://api.jquery.com/each/), an index integer, and the current iteration's element. That element argument is the same thing as `this`.

``` js
// using this
$('.button-row').each( function() {
  var $buttonRow = $( this );
});

// using each element argument
$('.button-row').each( function( i, buttonRow ) {
  var $buttonRow = $( buttonRow );
});
```

These two blocks of code work exactly the same. But using the `.each()` element argument has several benefits.

The `buttonRow` argument clearly signifies its purpose. It represents an individual element selected within the  `$('.button-row')` jQuery object. You can follow its relationship from the `'.button-row'` selector string, to being used an element to create the individual `$buttonRow` jQuery object.

As an argument, `buttonRow` can be picked-up by linters, thus making it easier to catch typos or missing arguments. `this`, being a keyword, is always available in any code block. So linters cannot catch these kind of problems with using `this`.

The big benefit is that we can be explicit in our code. Using `this` is like saying "And you know what _this_ is." Its meaning is implicit. `buttonRow` is an argument, so you can see where it comes from.

## event.currentTarget

Within event listeners, you can replace `this` with `event.currentTarget`.

``` js
// using this
$buttonRow.on( 'click', '.button', function() {
  $activeButton = $( this );
});

// using event.currentTarget
$buttonRow.on( 'click', '.button', function( event ) {
  $activeButton = $( event.currentTarget );
});
```

`event` is the function's first argument. It contains many properties and methods useful  `event.preventDefault()` for preventing default browser behavior, or `event.pageX` for mouse position. It also contains the current element selected for the event, [`event.currentTarget`, the same element as `this`](https://api.jquery.com/event.currentTarget/).

``` js
$buttonRow.on( 'click', function( event ) {
  console.log( event.currentTarget === this );
  // => true
});
```

`event.currentTarget` is [different from `event.target`](https://api.jquery.com/event.target/). `event.currentTarget` is the element specified in the jQuery object or filter argument. `event.target` is the element that initiated the event.

``` js
// clicking a <ul> with <li> items
$('ul').on( 'click', function( event ) {
  console.log( event.currentTarget );
  // => <ul>
  console.log( event.target );
  // => <li>
});
```

With `event.currentTarget`, our resolved code makes no use of `this` and instead relies on arguments for its elements.

``` js
$('.button-row').each( function( i, buttonRow ) {
  var $buttonRow = $( buttonRow );
  var $activeButton = $buttonRow.find('.button.is-active');

  $buttonRow.on( 'click', '.button', function( event ) {
    $activeButton.removeClass('is-active');
    $activeButton = $( event.currentTarget );
    $activeButton.addClass('is-active');
  });
});
```

## Wrap up

`this` in `.each()` and event listeners seems convienent, but leads to quirky code. We can side-step issues with jQuery's `this` by replacing it with arguments.

<!-- html-in-md </div> -->
