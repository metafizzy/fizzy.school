---
title: Return early
description: Look out for big code block within if blocks inside function. Resolve by using return to terminate function early.
layout: lesson
problemText: Big blocks of code within <code>if</code> blocks inside functions.
solutionText: Using <code>return</code> to terminate the function early and moving the code out of the conditional to save indentation.
problemCode: |
  function getTab( $link ) {
    var id = $link.attr('data-id');
    // check if tab exists
    var $tab = $gallery.find( '#' + id );
    if ( !$tab.length ) {
      // create tab if tab does not exist
      $tab = $( '<div class="gallery__tab" />', {
        id: id,
      });
      // ...
    }
    return $tab;
  }
resolveCode: |
  function getTab( $link ) {
    var id = $link.attr('data-id');
    // check if tab exists
    var $tab = $gallery.find( '#' + id );
    if ( $tab.length ) {
      return $tab;
    }

    // create tab if tab does not exist
    $tab = $( '<div class="gallery__tab" />', {
      id: id,
    });
    // ...
    return $tab;
  }
problemCodepen: ec1122e3eae8e58b96dbe975d68db987
resolveCodepen: 8ea66d113c84f109143e3f0e8ebcf74b
---

<p data-height="500" data-theme-id="dark" data-slug-hash="8ea66d113c84f109143e3f0e8ebcf74b" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="tab gallery - no early return" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/8ea66d113c84f109143e3f0e8ebcf74b/">tab gallery - no early return</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

<!-- html-in-md <div class="skinny-column"> -->

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
    // ...
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

  // create tab if tab does not exist
  $tab = $( '<div class="gallery__tab" />', {
    id: id,
  });
  // ...
  return $tab;
}
```

When a function encounters `return` it will not proceed any further. It's another way of blocking off code. Now you when read through this function, you can chunk it into distinct parts. The top half works if `$tab` is present. The bottom half works if not.

## Wrap up

Adding an early `return` may seem like a cosmetic change, but it provides a better way to section your code.

<!-- html-in-md </div> -->
