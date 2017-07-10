---
title: State with variables
layout: page
---

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

## Look out for

+ Checking for or removing all classes or types an element could have.
+ Checking the DOM with a jQuery selector to determine if an element is selected or active

## Resolve by

Using a variable to store the one class or type that is active.

---

jQuery makes it so easy to read and manipulate the DOM that developers are led to use the DOM for state. What do I mean by _state_? State is the current condition of the site. Which button is selected? Is the modal open? Has the request finished loading? All these questions are being asked about the site's state.

Let's look at our example. (Look how lovely it is with its `$swatchGroup` jQuery selector variable). It contains a row of buttons. Clicking a button adds a class to a swatch container element. That class changes the color of the swatch elements with CSS.

Because this demo uses CSS to change color, it needs to remove any previous color class. In the initial example, the previous class is removed by removing all potential color classes.

``` js
$swatchGroup.removeClass('red orange yellow green blue purple');
```

This code functionally works just fine. But its duplicating the HTML. This is a problem. Any change in the colors in the HTML means you'll have to make a similar change in the JavaScript. Having the colors hard-coded in JS also means that code can't be easily reused in another place, for another potential set of colors and swatches.

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

$('.color-button-group button').click( function() {
  $swatchGroup.removeClass( selectedColor );
  selectedColor = $( this ).text();
  $swatchGroup.addClass( selectedColor );
});
```

Note the order of this code. Each line uses `selectedColor`. But the `selectedColor` within `removeClass` may be a different value than when its used in `addClass` because its set in the middle line.

Now this code has no reference to the colors used in the HTML. The HTML colors can be changed, removed, or added to and the JS code will work just the same.

---

Let's look at another example


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
  </div>
</div>

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

The revised code is actually two lines longer than the original code. So why bother? For the same reason as with the color button example. Using a state variable has abstracted the code out from the HTML. Sometimes there's not even a class to check for. For example, if this demo used [Draggabilly](https://draggabilly.desandro.com), it does not add a class when disabled. Or if you decided to destroy/re-initialize the instance, you'd have to check for a different class.

Using a state variable makes your code more flexible. Leaving state up to the DOM makes your code brittle. Instead of relying on the DOM to keep track of what's going on, you can enable your JS to do the work for you.
