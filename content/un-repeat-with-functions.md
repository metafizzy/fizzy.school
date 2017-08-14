---
title: Un-repeat with functions
layout: lesson
problemText: Similar repeated code.
solutionText: Using a function to perform same code over multiple things.
problemCode: |
  // button row 1
  var $buttonRow1 = $('.button-row1');
  var $activeButton1 = $buttonRow1.find('.button.is-active');

  $buttonRow1.on( 'click', '.button', function() {
    // deactivate previous button
    $activeButton1.removeClass('is-active');
    // set & activate new button
    $activeButton1 = $( this );
    $activeButton1.addClass('is-active');
  });

  // button row 2
  var $buttonRow2 = $('.button-row2');
  var $activeButton2 = $buttonRow2.find('.button.is-active');

  $buttonRow2.on( 'click', '.button', function() {
    $activeButton2.removeClass('is-active');
    $activeButton2 = $( this );
    $activeButton2.addClass('is-active');
  });

  // button row 2
  var $buttonRow3 = $('.button-row3');
  var $activeButton3 = $buttonRow3.find('.button.is-active');

  $buttonRow3.on( 'click', '.button', function() {
    $activeButton3.removeClass('is-active');
    $activeButton3 = $( this );
    $activeButton3.addClass('is-active');
  });
solutionCode: |
  // use .each() to call function for each button row
  $('.button-row').each( function() {
    var $buttonRow = $( this );
    var $activeButton = $buttonRow.find('.button.is-active');

    $buttonRow.on( 'click', '.button', function() {
      // deactivate previous button
      $activeButton.removeClass('is-active');
      // set & activate new button
      $activeButton = $( this );
      $activeButton.addClass('is-active');
    });
  });
problemCodePen: 483afa257e21af6be748a84257562576
solutionCodePen: c713d68c0d6c21131635d98ac3bf76fb
---

<p data-height="350" data-theme-id="dark" data-slug-hash="c713d68c0d6c21131635d98ac3bf76fb" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="button rows 2" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/c713d68c0d6c21131635d98ac3bf76fb/">button rows 2</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

<!-- html-in-md <div class="skinny-column"> -->

## Lesson

With HTML, the code you write has a direct correlation to what you see in a browser. If you code three `<button>` elements, then your page will have three buttons.
  
``` html
<div class="button-row">
  <button>Alpha</button>
  <button>Beta</button>
  <button>Gamma</button>
</div>
```

This one-to-one mapping makes HTML approachable, establishing it as the first language web developers learn. Repeated code is essential to how HTML works.

But with JavaScript, repeated code may not be necessary. Whereas HTML requires multiple elements to be represented in the code, JavaScript can use the same code over multiple elements. You're already familar with this kind of abstraction working with CSS. A single CSS style can be applied to multiple matching elements.

Our example deals with a button row with a single active button. Clicking a button will the change active button in the row.

``` html
<div class="button-row">
  <button class="button is-active">Alpha</button>
  <button class="button">Beta</button>
  <button class="button">Gamma</button>
</div>
```

In the JS, clicking a button removes the active class from the active button, changes the active button to the clicked button, and adds the active class to that. `$activeButton` works both as a [cached jQuery object](cache-jquery-objects) and a [state variable](http://local/fizzy.school/build/state-variables).

``` js
var $buttonRow = $('.button-row');
var $activeButton = $buttonRow.find('.button.is-active');

$buttonRow.on( 'click', '.button', function() {
  // deactivate previous button
  $activeButton.removeClass('is-active');
  // set & activate new button
  $activeButton = $( this );
  $activeButton.addClass('is-active');
});
```

Now let's consider a page with multiple button rows.

``` html
<div class="button-row button-row1">
  <button class="button is-active">Alpha</button>
  <button class="button">Beta</button>
  <button class="button">Gamma</button>
</div>

<div class="button-row button-row2">
  <button class="button is-active">Leonardo</button>
  <button class="button">Michelangelo</button>
  <button class="button">Raphael</button>
</div>

<div class="button-row button-row3">
  <button class="button is-active">Red</button>
  <button class="button">Orange</button>
  <button class="button">Yellow</button>
</div>
```

How do we change the JavaScript to work with these multiple groups? The HTML was repeated, so you could repeat the JavaScript with additional code blocks and variables for each row.

``` js
// button row 1
var $buttonRow1 = $('.button-row1');
var $activeButton1 = $buttonRow1.find('.button.is-active');

$buttonRow1.on( 'click', '.button', function() {
  // deactivate previous button
  $activeButton1.removeClass('is-active');
  // set & activate new button
  $activeButton1 = $( this );
  $activeButton1.addClass('is-active');
});

// button row 2
var $buttonRow2 = $('.button-row2');
var $activeButton2 = $buttonRow2.find('.button.is-active');

$buttonRow2.on( 'click', '.button', function() {
  $activeButton2.removeClass('is-active');
  $activeButton2 = $( this );
  $activeButton2.addClass('is-active');
});

// button row 3
var $buttonRow3 = $('.button-row3');
var $activeButton3 = $buttonRow3.find('.button.is-active');

$buttonRow3.on( 'click', '.button', function() {
  $activeButton3.removeClass('is-active');
  $activeButton3 = $( this );
  $activeButton3.addClass('is-active');
});
```

Ugh, that's a lot of code. And the bummer is that the code blocks are nearly exactly the same, only with different variables and different selectors.

And yeah, it works. But what happens if another row gets added? Or removed? Or if the behavior changes so that multiple buttons could be selected? Changing this kind of repetitive code would be a drag.

One way to un-repeat this code is to use a function. (I say "one fix," not _the_ fix, because there are other ways to resolve duplicated code blocks: loops and event delegation. But that's for another lesson.) 

## .each()

Since we are using jQuery, we can iterate over each button row with `.each()`.

``` js
// iterate over each row
$('.button-row').each( function() {
  // get row elements
  var $buttonRow = $( this );
  var $activeButton = $buttonRow.find('.button.is-active');

  $buttonRow.on( 'click', '.button', function() {
    // deactivate previous button
    $activeButton.removeClass('is-active');
    // set & activate new button
    $activeButton = $( this );
    $activeButton.addClass('is-active');
  });
});
```

Let's break down what's going on here. `.each()` works by calling a function for each element in a jQuery object. As there are three `.button-row` elements, the function within `.each()` will be called three times.

Because the variables and click handler are declared within the function, they are particular to their iteration of the `.each()` function being called. The value of `$buttonRow` and `$activeButton` will be different for each iteration.

Variables have what's called _function scope_. They are scoped, or enclosed to the function they are declared in. In this case, `$buttonRow` and `$activeButton` are _enclosed_ with in the function for `.each()`. When stuff like variables are enclosed in a function, it's called a _closure_. Closures are a significant concept in JavaScript. But for now, all you need to know is that stuff declared within functions stay within functions.

Using a function with `.each()`, we can remove repeated code. We can abstract away the one-to-one relationships similar to HTML by generalizing the behavior over multiple iterations in JavaScript.

## Calling functions

Let's approach this code another way. Instead of jQuery's `.each()`, we can directly call a vanilla function.

``` js
function initButtonRow( selector ) {
  // get row elements
  var $buttonRow = $( selector );
  var $activeButton = $buttonRow.find('.button.is-active');

  $buttonRow.on( 'click', '.button', function() {
    // deactivate previous button
    $activeButton.removeClass('is-active');
    // set & activate new button
    $activeButton = $( this );
    $activeButton.addClass('is-active');
  });
}

initButtonRow('.button-row1');
initButtonRow('.button-row2');
initButtonRow('.button-row3');
```

This code has two parts.

First, the function `initButtonRow` is declared. This function works nearly the same as the function in `.each()`, the only difference being the addition of a `selector` argument used to to select the element, instead of using `this`.

Second, because we're not using `.each()`, the function `initButtonRow` has to be called. So we call it three times, once for each button row selector.

With this vanilla function, it's clearer how the same function is used multiple times. Each time it's called with a different selector, so its enclosed variables work on different elements.

## Wrap up

You can use either pattern: jQuery's `.each()` method, or vanilla functions. When working with jQuery objects, `.each()` is a good fit. But you can always write your own vanilla functions.

What's important is that you understand how to use functions to un-repeat your code. You don't need to repeat blocks of code like do you with HTML. In JavaScript, the same behavior can be applied to multiple elements. By reducing the amount of JavaScript you write, you make it more managable and more resilient.

<!-- html-in-md </div> -->
