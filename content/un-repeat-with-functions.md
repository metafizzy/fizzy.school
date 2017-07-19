---
title: Un-repeat with functions
layout: lesson
problemText: Similar repeated code.
solutionText: Using a function to perform same code over multiple things.
problemCode: |
  // button row 1
  var $buttonRow1 = $('.button-row1');
  var $activeButton1 = $buttonRow1.find('.button.is-active');

  $buttonRow1.on( 'click', '.button', function( event ) {
    // deactivate previous button
    $activeButton1.removeClass('is-active');
    // set & activate new button
    $activeButton1 = $( this );
    $activeButton1.addClass('is-active');
  });

  // button row 2
  var $buttonRow2 = $('.button-row2');
  var $activeButton2 = $buttonRow2.find('.button.is-active');

  $buttonRow2.on( 'click', '.button', function( event ) {
    $activeButton2.removeClass('is-active');
    $activeButton2 = $( this );
    $activeButton2.addClass('is-active');
  });

  // button row 2
  var $buttonRow3 = $('.button-row3');
  var $activeButton3 = $buttonRow3.find('.button.is-active');

  $buttonRow3.on( 'click', '.button', function( event ) {
    $activeButton3.removeClass('is-active');
    $activeButton3 = $( this );
    $activeButton3.addClass('is-active');
  });
solutionCode: |
  // use .each() to call function for each button row
  $('.button-row').each( function() {
    var $buttonRow = $( this );
    var $activeButton = $buttonRow.find('.button.is-active');

    $buttonRow.on( 'click', '.button', function( event ) {
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

HTML is near beautiful in its simplicity. The code you write has a direct correlation to what you see in a browser. If you code three `<button>` elements, then your page will have three buttons.
  
``` html
<div class="button-row">
  <button>Alpha</button>
  <button>Beta</button>
  <button>Gamma</button>
</div>
```

This one-to-one mapping makes HTML approachable, establishing it as the first language web developers learn. Repeated code is essential to how HTML works.

But with JavaScript, repeated code may not be necessary. Whereas HTML requires that multiple elements have their own code, JavaScript can use the same code over multiple elements. You're already familar with this kind of abstraction working with CSS. A single CSS style gets applied to multiple matching elements.

Our example deals with button row with a single active button. Clicking a button in the row changes the active button.

``` html
<div class="button-row">
  <button class="button is-active">Alpha</button>
  <button class="button">Beta</button>
  <button class="button">Gamma</button>
</div>
```

The JS code for a single row looks like this:

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

Just like with HTML, you could resolve this task by declaring multiple code blocks for each button row, with separate variables for each group.

``` js
// button row 1
var $buttonRow1 = $('.button-row1');
var $activeButton1 = $buttonRow1.find('.button.is-active');

$buttonRow1.on( 'click', '.button', function( event ) {
  // deactivate previous button
  $activeButton1.removeClass('is-active');
  // set & activate new button
  $activeButton1 = $( this );
  $activeButton1.addClass('is-active');
});

// button row 2
var $buttonRow2 = $('.button-row2');
var $activeButton2 = $buttonRow2.find('.button.is-active');

$buttonRow2.on( 'click', '.button', function( event ) {
  $activeButton2.removeClass('is-active');
  $activeButton2 = $( this );
  $activeButton2.addClass('is-active');
});

// button row 3
var $buttonRow3 = $('.button-row3');
var $activeButton3 = $buttonRow3.find('.button.is-active');

$buttonRow3.on( 'click', '.button', function( event ) {
  $activeButton3.removeClass('is-active');
  $activeButton3 = $( this );
  $activeButton3.addClass('is-active');
});
```

Ugh, that's a lot of code. And the bummer is that it's nearly exactly the same, only with different variables and different selectors.

And yeah, it works. But what happens if another row gets added? Or removed? Or if the behavior changes so that multiple buttons can be selected? Changing this kind of repetitive code would be a drag.

A fix is to use a function. (I say "a fix," not _the_ fix, because there are other ways to resolve duplicated code blocks: loops and event delegation. But that's for another lesson.) 

## .each()

Since we are using jQuery, we can iterate over each button row with `.each()`.


``` js
// iterate over each row
$('.button-row').each( function() {
  // get row elements
  var $buttonRow = $( this );
  var $activeButton = $buttonRow.find('.button.is-active');

  $buttonRow.on( 'click', '.button', function( event ) {
    // deactivate previous button
    $activeButton.removeClass('is-active');
    // set & activate new button
    $activeButton = $( this );
    $activeButton.addClass('is-active');
  });
});
```

Let's break down what's going on here. `.each()` works by calling a function for each element in a jQuery object. In our example, `.each()` is working on all `.button-row` elements. For each of those elements, the function within `.each(...)` is called.

Now let's look inside the function. There is only one `$buttonRow` variable declared. This variable exists within the function. Although there is only one, three separate `$buttonRow` variables are used: one for each of the `.button-row` elements. But these three variables do not interfer with one another, because they are declared within the function. Variables have what's called _function scope_. `$buttonRow` is _enclosed_ with in the function.

When stuff like variables is enclosed in a function, it's called an _closure_ (I now wonder, why not call it an _enclosure_? That'd make more sense, right?) Closures are an significant concept in JavaScript. But for now, all you need to know is that stuff declared within functions stay within functions.

This code has abstracted from the one-to-one relationship of the previous version. It works by generalizing the behavior. All of the variables and functions declared are particular to the function enclosing them.

## Generalized function

Let's approach this lesson another way. Instead of jQuery `.each()`, we'll use a basic function of our own.

``` js
initButtonRow('.button-row1');
initButtonRow('.button-row2');
initButtonRow('.button-row3');

function initButtonRow( selector ) {
  // get row elements
  var $buttonRow = $( selector );
  var $activeButton = $buttonRow.find('.button.is-active');

  $buttonRow.on( 'click', '.button', function( event ) {
    // deactivate previous button
    $activeButton.removeClass('is-active');
    // set & activate new button
    $activeButton = $( this );
    $activeButton.addClass('is-active');
  });
}
```

This code has two pieces. First, `initButtonRow` is called three times for each button row selector. Second, the function `initButtonRow` is declared.

In JavaScript functions that are coded like `function doSomething() {...}` get hoisted, which means you can call them before the code that declares them. I prefer this order as it first introduces how you are using the function, then follows up with what the function actually is. But you can first declare your function then call it if you like.

This functions works nearly exactly the same as the function in `.each()` (the only difference being the addition of a `selector` argument used to to select the element, instead of using `this`).

With this code, it's clearer how the same function is used multiple times. Each time it's called with a different selector. For each call, its enclosed variables work on different elements.

## Wrap up

Functions allow us to abstract our code. The same behavior can be applied to multiple elements. By reducing our JavaScript code, it becomes more managable and resilient.

<!-- html-in-md </div> -->
