---
title: State variables
layout: lesson
description: Learn how to use variables to keep track of state instead of checking the DOM.
problemText: Checking if an element has a class.
solutionText: Using a variable to keep track of state.
problemCode: |
  $toggleButton.on( 'click', function() {
    $modal.toggleClass('is-open');
    // check state by checking DOM
    if ( $modal.hasClass('is-open') ) {
      $toggleButton.text('Close');
    } else {
      $toggleButton.text('View more');
    }
  });
solutionCode: |
  // use state variable to keep track
  var isModalOpen = false;

  $toggleButton.on( 'click', function() {
    isModalOpen = !isModalOpen;
    $modal.toggleClass('is-open');
    if ( isModalOpen ) {
      $toggleButton.text('Close');
    } else {
      $toggleButton.text('View more');
    }
  });
problemCodePen: f196426516f0a312b0ce45633af346e9
solutionCodePen: d67e7c02eb06e34677b3008bb2a45a6f
---

<p data-height="300" data-theme-id="dark" data-slug-hash="d67e7c02eb06e34677b3008bb2a45a6f" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="State variables - modal - after" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/d67e7c02eb06e34677b3008bb2a45a6f/">State variables - modal - after</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>

<!-- html-in-md <div class="skinny-column"> -->

## Video

<!-- html-in-md {{> lesson-video youtubeSlug="qix5ICRv3DI" }} -->

## Lesson

jQuery makes it so easy to read and manipulate the DOM that developers are led to use the DOM for state. What do I mean by _state_? State is the current condition of the site. Which button is selected? Is the modal open? Has the request finished loading? All these questions are being asked about the site's state.

Let's look at an example. It's a simple modal. Clicking a button toggles the modal open or closed, and it toggles the text of the button from _View more_ when closed to _Close_ when open.

In the JS, we determine the state of the modal, whether its open or closed, by checking if its element has the class `is-open`.

``` js
var $toggleButton = $('.toggle-button');
var $modal = $('.modal');

$toggleButton.on( 'click', function() {
  $modal.toggleClass('is-open');
  if ( $modal.hasClass('is-open') ) {
    $toggleButton.text('Close');
  } else {
    $toggleButton.text('View more');
  }
});
```

(Look how lovely it is with its `$modal` and `$toggleButton` [jQuery object variables](cache-jquery-objects).)

And it works! So what's the issue?

When working with jQuery, you can get into a jQuery mindset. You start thinking of all of programming in jQuery terms: get elements, and do something with them. But jQuery exists within JavaScript, a programming language that has its own lower-level concepts. And with these concepts, we can write better code.

The issue with checking the class, is that we don't need to read the DOM to know what the state is. Our program can keep track of its own state. We can do this with a **variable**.

At the top, let's add a variable `isModalOpen` and set it to `false`.

``` js
var isModalOpen = false;
```

Within the click event callback function, we'll switch `isModalOpen` to its opposite, `false` to `true`, or `true` to `false`.

``` js
var isModalOpen = false;

$toggleButton.on( 'click', function() {
  isModalOpen = !isModalOpen;
  ...
});
```

Now our program knows if the modal is open or not. So we can use the variable within the conditional.

``` js
var isModalOpen = false;

$toggleButton.on( 'click', function() {
  isModalOpen = !isModalOpen;
  $modal.toggleClass('is-open');
  if ( isModalOpen ) {
    $toggleButton.text('Close');
  } else {
    $toggleButton.text('View more');
  }
});
```

Nice! By adding a state variable we have removed a check of the DOM. We have abstracted the behavior out of the HTML so our JavaScript is more flexible.

But more importantly, you can start to grasp the potential of using variables to keep track of stuff.

Or not. So we added a variable, but the code is actually longer and it functionally works exactly the same. Is that really an improvement?

## Removing multiple classes


Let's look at another example. This time, we're not just dealing with a simple on-off switch, but multiple values.

<!-- html-in-md </div> -->

<div class="duo">
  <div class="duo__cell">
    <h3>Look out for</h3>
    <p>Removing all possible classes an element could have.</p>
  </div>
  <div class="duo__cell">
    <h3>Resolve by</h3>
    <p>Using a variable to store the one thing that is active.</p>
  </div>
</div>

<div class="duo code-compare">
  <div class="duo__cell code-compare__nay">
    ``` js
    $('.color-button-group button').on( 'click', function() {
      $swatchGroup.removeClass('red orange yellow green blue purple');
      selectedColor = $( this ).text();
      $swatchGroup.addClass( selectedColor );
    });
    ```
    <!-- html-in-md {{> edit-codepen codepenSlug="938d5487859e2a3810dc9f23e94fd96c"}} -->
  </div>
  <div class="duo__cell code-compare__yay">
    ``` js
    var selectedColor;

    $('.color-button-group button').on( 'click', function() {
      $swatchGroup.removeClass( selectedColor );
      selectedColor = $( this ).text();
      $swatchGroup.addClass( selectedColor );
    });
    ```
    <!-- html-in-md {{> edit-codepen codepenSlug="2c365670c217f7b3266c0c8e7b95d22f"}} -->
  </div>
</div>

<p data-height="300" data-theme-id="dark" data-slug-hash="2c365670c217f7b3266c0c8e7b95d22f" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="Color buttons - state variable" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/2c365670c217f7b3266c0c8e7b95d22f/">Color buttons - state variable</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>

<!-- html-in-md <div class="skinny-column"> -->

This example has several buttons. Clicking a button adds a color class, which changes the color of several elements with CSS.

Because this example uses CSS to change color, it needs to remove any previous color class. Currently, the previous class is removed by removing all potential color classes.

``` js
$swatchGroup.removeClass('red orange yellow green blue purple');
```

Functionally, This code  works just fine. But it's duplicating the HTML. This is a problem. Any change in the colors in the HTML means you'll have to make a similar change in the JavaScript. Having the colors hard-coded in JS also means that code can't be easily reused in another place, for another potential set of colors and swatches.

Let's add a variable, `selectedColor`, to keep track of the selected color. We'll declare the variable `selectedColor` at the top. Then use it to remove the previous class. Then update `selectedColor` from the element in the event. And finally use the updated value to add the clicked color.

``` js
var selectedColor;

$('.color-button-group button').on( 'click', function() {
  $swatchGroup.removeClass( selectedColor );
  selectedColor = $( this ).text();
  $swatchGroup.addClass( selectedColor );
});
```

Now this code has no reference to the colors used in the HTML. You can add, remove, and change the colors in the HTML and the JS code will work just the same.

## Wrap up

That's what state variables are all about. They allow you to keep your HTML structure out of your JavaScript. So you can think of the JavaScript just as its behavior, not as the content its works with.

These are simple examples, but their lessons are important. Up until now, you likely have thought of writing JavaScript in terms of what's on the page. By using variables, you are opening a new door in understanding JavaScript. It's not just what's on the page, but what's inside your program.

<!-- html-in-md </div> -->

<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
