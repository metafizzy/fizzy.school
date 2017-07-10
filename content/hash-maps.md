---
title: Hash maps
layout: page
---

<div class="duo code-compare">
  <div class="duo__cell code-compare__nay">
    <h2>Look out for</h2>
    <p>Long, repetitive conditionals checking over the same value</p>
    ``` js
    var stateName;
      if ( value == 'DE' ) {
        stateName = 'Delaware';
      } else if ( value == 'MA' ) {
        stateName = 'Massachusetts';
      } else if ( value == 'MD' ) {
        stateName = 'Maryland';
      } else if ( value == 'NJ' ) {
        stateName = 'New Jersey';
      }
    });
    ```
    https://codepen.io/desandro/pen/e6366654a1566325c6c471adf2a9a2a2/
  </div>
  <div class="duo__cell code-compare__yay">
    <h2>The fix</h2>
    <p>Set data in an list-like object and accessing a value with a variable.</p>
    ``` js
    var stateNames = {
      DE: 'Delaware',
      MA: 'Massachusetts',
      MD: 'Maryland',
      NJ: 'New Jersey',
    };

    var stateName = stateNames[ value ];
    ```
    https://codepen.io/desandro/pen/200711f375d97a12eec816abaec5fc50
  </div>
</div>

<!-- html-in-md <div class="lesson-content"> -->

## The lesson

Programming has a sublime beauty in its simplification. Long strings of text and big concepts can be reduced to wee variables, which are easier to both read and manipulate. But ultimately, the goal of programming is work with humans, who unfortunately have no need for the variables. They prefer the original fully-expanded strings and concepts.

The example above deals with this dilemma. There is a `<select>` menu for some states. The menu uses the states abbreviations. When a state is selected, its corresponding full state name is displayed in a human-readble sentence.

The original gets the state name via a big conditional chain. It checks the value of `value` variable, which requires a separate conditional for each abbrievation.

``` js
if ( value == 'DE' ) {
  stateName = 'Delaware';
} else if ( value == 'MA' ) {
  stateName = 'Massachusetts';
} else if ( value == 'MD' ) {
  stateName = 'Maryland';
} else if ( value == 'NJ' ) {
  stateName = 'New Jersey';
}
```

This code, of course, functionally gets the job done. But its repetitive nature is irksome. The conditional and assignment code is nearly identical. The only change are the values being checked and used.

This is an ideal case for a _hash map_.

A hash map is a fancy programmer word for an un-ordered look-up list. Think of an index in a book. Look up _turtles_: turn to page 67. Look up _tadpole_ turn to page 42. For each look-up key, it has a looked-up value.

In JavaScript, we can write hash maps with Objects.

``` js
var stateNames = {
  DE: 'Delaware',
  MA: 'Massachusetts',
  MD: 'Maryland',
  NJ: 'New Jersey',
};
```

This object, stored as a variable `stateNames`, is a list of the states. The object consist of multiple properties, the states. Each property has a key, the state abbrieviation, and a value, the state name. On its own, it's just data. What makes it useful is that we access the state names programmatically.

To access a property value, you may typically dot notation

``` js
stateNames.DE;
// => 'Delaware'
```

But, in our example, we don't want to explicitly write out the key (the state's abbrieviation in this case). We want to get the property that matches another variable. To do so, we use bracket notation.

``` js
stateNames['DE'];
// => 'Delaware'
```

The brackets allow us to pull the key's value out and use it as a variable.

```
// use variable in brackets
var abbrev = 'DE';
stateNames[ abbrev ];
// => 'Delaware'
```

Let's put this this concept into the revised code:

``` js
var stateNames = {
  DE: 'Delaware',
  MA: 'Massachusetts',
  MD: 'Maryland',
  NJ: 'New Jersey',
};

var $stateSelect = $('.state-select').on( 'change', function() {
  var value = $stateSelect.val();
  // get state name from hash
  var stateName = stateNames[ value ];
  // ...
});
```

All the logic with checking the variable is exchanged for a look-up. If the variable matches a key, its property value is returned.

## Truthy hash maps

Let's expand on the above example. We'll add a title to the state name, either _State_ or _Commonwealth_.

</div>

<div class="duo code-compare">
  <div class="duo__cell code-compare__nay">
    ``` js
    var isCommonwealth = value == 'MA' || value == 'VA' || value == 'PA';
    ```
  </div>
  <div class="duo__cell code-compare__yay">
    ``` js
    var commonwealths = {
      MA: true,
      VA: true,
      PA: true,
    };

    var isCommonwealth = commonwealths[ value ];
    ```
  </div>
</div>

<!-- html-in-md <div class="lesson-content"> -->

In the original example, we check if the state is a commonwealth with conditionals for each potential value. This requires multiple conditionals, grouped together with OR `||` operator.

``` js
var isCommonwealth = value == 'MA' || value == 'VA' || value == 'PA';
```

We can replace this series of conditionals with another hash map.

``` js
var commonwealths = {
  MA: true,
  VA: true,
  PA: true,
};

var isCommonwealth = commonwealths[ value ];
```

Whereas in the previous example we used the value of the matched property, here we are checking if the property is _truthy_.

``` js
if ( isCommonwealth ) {
  title = 'Commonwealth';
}
```

This pattern is more abstract than a straight set of conditionals. But the benefit is greater readability. Parsing complex conditionals is difficult. Using a hash map reduces the complexity by asking "Is this value in the list?"

## Methods in hash maps

<!-- html-in-mid </div> -->
