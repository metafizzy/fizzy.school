---
title: State variables
layout: page
---

<div class="duo">
  <div class="duo__cell">
    <h2>Look out for</h2>
    <p>Removing all possible classes an element could have.</p>
  </div>
  <div class="duo__cell">
    <h2>Solution</h2>
    <p>Use a variable to store the one thing that is active.</p>
  </div>
</div>

<div class="duo code-compare">
  <div class="duo__cell code-compare__nay">
    ``` js
    var $swatchGroup = $('.swatch-group');

    $('.color-button-group button').on( 'click', function() {
      // remove every possible class
      $swatchGroup.removeClass('red orange yellow green blue purple');
      // set color
      var color = $( this ).text();
      $swatchGroup.addClass( color );
    });
    ```
    <!-- https://codepen.io/desandro/pen/938d5487859e2a3810dc9f23e94fd96c -->
  </div>
  <div class="duo__cell code-compare__yay">
    ``` js
    var $swatchGroup = $('.swatch-group');
    var selectedColor;

    $('.color-button-group button').on( 'click', function() {
      // remove only the selected color
      $swatchGroup.removeClass( selectedColor );
      // set color
      selectedColor = $( this ).text();
      $swatchGroup.addClass( selectedColor );
    });
    ```
    <!-- https://codepen.io/desandro/pen/2c365670c217f7b3266c0c8e7b95d22f -->
  </div>
</div>

<!-- html-in-md <div class="lesson-content"> -->

<p data-height="300" data-theme-id="dark" data-slug-hash="2c365670c217f7b3266c0c8e7b95d22f" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="color buttons 2" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/2c365670c217f7b3266c0c8e7b95d22f/">color buttons 2</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>

## Benefits

+ Simpler code by removing HTML structure from JS
+ Abstracted code easier to re-use
+ Only act upon one element, rather than acting upon all the potential elements

## Lesson

jQuery makes it so easy to read and manipulate the DOM that developers are led to use the DOM for state. What do I mean by _state_? State is the current condition of the site. Which button is selected? Is the modal open? Has the request finished loading? All these questions are being asked about the site's state.

Let's look at our example. (Look how lovely it is with its `$swatchGroup` [jQuery object variable](cache-jquery-objects)). It contains a row of buttons. Clicking a button adds a class to a swatch container element. That class changes the color of the swatch elements with CSS.

Because this demo uses CSS to change color, it needs to remove any previous color class. In the initial example, the previous class is removed by removing all potential color classes.

``` js
$swatchGroup.removeClass('red orange yellow green blue purple');
```

This code functionally works just fine. But it's duplicating the HTML. This is a problem. Any change in the colors in the HTML means you'll have to make a similar change in the JavaScript. Having the colors hard-coded in JS also means that code can't be easily reused in another place, for another potential set of colors and swatches.

We can resolve this issue by using a separate variable to keep track of what color has been selected.

Variables allow us to abstract information out of our view, the DOM, and re-use in for our program.

Let's add variable declaration at top, outside of the click handler.

``` js
var selectedColor;
```

Now when a button is clicked, let's remove whatever the `selectedColor` is. We'll also update `selectedColor` to match the clicked button. Finally, this updated `selectedColor` will be added to change the current swatch color.

``` js
var $swatchGroup = $('.swatch-group');
var selectedColor;

$('.color-button-group button').on( 'click', function() {
  $swatchGroup.removeClass( selectedColor );
  selectedColor = $( this ).text();
  $swatchGroup.addClass( selectedColor );
});
```

Note the order of this code. Each line uses `selectedColor`. But the `selectedColor` within `removeClass` may be a different value than when its used in `addClass` because its set in the middle line.

Now this code has no reference to the colors used in the HTML. The HTML colors can be changed, removed, or added to and the JS code will work just the same.

## Flags: boolean state variables

<!-- html-in-md </div> -->

<div class="duo">
  <div class="duo__cell">
    <h2>Look out for</h2>
    <p>Checking the DOM to determine if an element is selected or active.</p>
  </div>
  <div class="duo__cell">
    <h2>Solution</h2>
    <p>Use a variable to store if something is active.</p>
  </div>
</div>

<div class="duo code-compare">
  <div class="duo__cell code-compare__nay">
    ``` js
    var $dragItem = $('.drag-item').draggable();

    $('.toggle-drag-button').on( 'click', function() {
      // check if draggable via class
      if ( $dragItem.hasClass('ui-draggable-disabled') ) {
        $dragItem.draggable('enable');
      } else {
        $dragItem.draggable('disable');
      }
    });
    ```
    <!--https://codepen.io/desandro/pen/ae4b166567e81a4cd4a0f007869fd0ae -->
  </div>
  <div class="duo__cell code-compare__yay">
    ``` js
    var $dragItem = $('.drag-item').draggable();
    var isDraggable = true;

    $('.toggle-drag-button').on( 'click', function() {
      // check if draggable via state variable
      if ( isDraggable ) {
        $dragItem.draggable('disable');
      } else {
        $dragItem.draggable('enable');
      }
      // update state variable
      isDraggable = !isDraggable;
    });
    ```
    <!-- https://codepen.io/desandro/pen/8022c4be3775dc75638c8e9997476a9a -->
  </div>
</div>

<!-- html-in-md <div class="lesson-content"> -->

<p data-height="300" data-theme-id="dark" data-slug-hash="8022c4be3775dc75638c8e9997476a9a" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="draggable 2" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/8022c4be3775dc75638c8e9997476a9a/">draggable 2</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

This example has a draggable element and a toggle button. Clicking the button toggles the element being draggable or un-draggable.

In the initial code, the toggle's conditional checks the state by checking a class.

``` js
if ( $dragItem.hasClass('ui-draggable-disabled') ) {
```

In the revised code, the toggle works by checking a state variable, and then re-setting that variable to its opposite boolean (if `true` set to `false`, and visa versa).

``` js
if ( isDraggable ) { ... }
isDraggable = !isDraggable;
```

This kind of variable is often called a _flag_: a variable set as a boolean, either `true` or `false`, which indicates if something is active or inactive.

The revised code is actually two lines longer than the original code. So why bother? For the same reason as with the color button example. Using a state variable has abstracted the code out from the HTML. Sometimes there's not even a class to check for. For example, if this demo used [Draggabilly](https://draggabilly.desandro.com), it does not add a class when disabled. Or if you decided to destroy/re-initialize the instance, you'd have to check for a different class.

## Wrap up

Using a state variable makes your code more flexible. Leaving state up to the DOM makes your code brittle. Instead of relying on the DOM to keep track of what's going on, you can enable your JS to do the work for you.

<!-- html-in-md </div> -->

<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
