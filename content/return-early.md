---
title: Return early
layout: page
---

<div class="duo">
  <div class="duo__cell">
    <h2>Look out for</h2>
    <p>Big block of code within a <code>if</code> inside a function</p>
  </div>
  <div class="duo__cell">
    <h2>Solution</h2>
    <p>Use <code>return</code> to terminate the function early, and move the code out of the conditional to save indentation.</p>
  </div>
</div>

<div class="duo code-compare">
  <div class="duo__cell code-compare__nay">
    ``` js
    function getTab( $link ) {
      var id = $link.attr('data-id');
      // check if tab exists
      var $tab = $gallery.find( '#' + id );
      if ( !$tab.length ) {
        // create tab if tab does not exist
        $tab = $( '<div class="gallery\__tab" />', {
          id: id,
        });
        // ...
      }
      return $tab;
    }
    ```
    
    <!-- https://codepen.io/desandro/pen/ec1122e3eae8e58b96dbe975d68db987 -->
  </div>
  <div class="duo__cell code-compare__yay">
    ``` js
    function getTab( $link ) {
      var id = $link.attr('data-id');
      // check if tab exists
      var $tab = $gallery.find( '#' + id );
      if ( $tab.length ) {
        return $tab;
      }

      // create tab if tab does not exist
      $tab = $( '<div class="gallery\__tab" />', {
        id: id,
      });
      // ...
      return $tab;
    }
    ```
    
    <!-- https://codepen.io/desandro/pen/c713d68c0d6c21131635d98ac3bf76fb -->
  </div>
</div>

<!-- html-in-md <div class="lesson-content"> -->

## Benefits

Readability: removing indentation makes code easier to read

## Lesson

Indentation allow us to visually see a block of code as a group. Ideally, we could write especially clean and straight-forward code that never has more than 2-3 levels of indentation. Keeping indentation level low makes code more linear. Each level of indentation means you need to keep track of more of the code's context in your head. The fewer nests of indentation means less things to keep track of.

In our initial example, we're looking at a function that returns a tab jQuery object. If the tab does not yet exist on the page, it is created within the function.


``` js
function getTab( $link ) {
  var id = $link.attr('data-id');
  // check if tab exists
  var $tab = $gallery.find( '#' + id );
  if ( !$tab.length ) {
    // create tab if tab does not exist
    $tab = $( '<div class="gallery__tab" />', {
      id: id,
    });
    // create title
    var $title = $('<h2 class="gallery__title" />');
    $title.text( $link.text() );
    // create image
    var $image = $( '<img class="gallery__image" />');
    $image.attr( 'src', $link.attr('href') );
    // create caption
    var $caption = $('<p class="gallery__caption" />');
    $caption.text( $link.attr('title') );
    // put it all together
    $tab.append( $title ).append( $image ).append( $caption );
    $gallery.append( $tab );
  }
  return $tab;
}
```

Even though the function is about getting the tab, the majority of the code is about creating it. This kind of big blocks of code in a `if` conditional is hard to read. Because of its lop-sided structure, it's difficult to see at a glance what the function is working towards. There's also a big gap if `$tab.length` is truthy. You have to keep both contexts, if `$tab.length` is truthy or falsey, in your head as your read it all.

This is a good opportunity to use an early `return`. We can reverse the conditional and move the conditional code outside. This makes a clear between split the two logic paths.

``` js
function getTab( $link ) {
  var id = $link.attr('data-id');
  // check if tab exists
  var $tab = $gallery.find( '#' + id );
  if ( $tab.length ) {
    return $tab;
  }
  // all done if $tab exists
  // create tab if tab does not exist
  $tab = $( '<div class="gallery__tab" />', {
    id: id,
  });
  // create title
  var $title = $('<h2 class="gallery__title" />');
  $title.text( $link.text() );
  // create image
  var $image = $( '<img class="gallery__image" />');
  $image.attr( 'src', $link.attr('href') );
  // create caption
  var $caption = $('<p class="gallery__caption" />');
  $caption.text( $link.attr('title') );
  // put it all together
  $tab.append( $title ).append( $image ).append( $caption );
  $gallery.append( $tab );
  return $tab;
}
```

When a function encounters `return` it will not proceed any further. It's another way of blocking off code. Now you when read through this function, you can chunk it into distinct parts. The top half works if `$tab` is present. The bottom half works if not.

## Wrap up

Adding an early `return` may seem like a cosmetic change, but it provides a better way to section your code.

<!-- html-in-md </div> -->
