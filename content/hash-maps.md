---
title: Hash maps
layout: lesson
problemText: Long, repetitive conditionals checking over the same value.
solutionText: Using a hash map. Set data in an list-like object and access values with variables.
problemCode: |
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
solutionCode: |
  var stateNames = {
    DE: 'Delaware',
    MA: 'Massachusetts',
    MD: 'Maryland',
    NJ: 'New Jersey',
  };

  var stateName = stateNames[ value ];
problemCodePen: e6366654a1566325c6c471adf2a9a2a2
solutionCodePen: 200711f375d97a12eec816abaec5fc50
---

<p data-height="300" data-theme-id="dark" data-slug-hash="200711f375d97a12eec816abaec5fc50" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="state select 2" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/200711f375d97a12eec816abaec5fc50/">state select 2</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>

<!-- html-in-md <div class="skinny-column"> -->

## Benefits

+ Clean up code
+ Learn how to leverage bracket notation with objects

## Lesson

Programming is largely about abstractions. Long strings of text and big concepts can be reduced to wee variables, which are easier to both read and manipulate in the code. But ultimately, the goal of programming is work with humans, who live outside the code. They prefer the original, fully-expanded strings and concepts.

The example above deals with this dilemma. We have a `<select>` menu for some U.S. states. The menu uses the states abbreviations. When a state is selected, its corresponding full state name is displayed in a human-readble sentence.

The initial example gets the state name via a chain of conditionals. It checks the value of a `value` variable, which requires a separate conditional and assignment for each abbrievation.

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

This code, of course, functionally gets the job done. But its repetitive nature is irksome. The code blocks all share the exact same structure. The only change are the values being checked and used.

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

``` js
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
    var isCommonwealth = value == 'MA' ||
      value == 'VA' || value == 'PA';
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

<!-- html-in-md <div class="skinny-column"> -->

In the initial example, we check if the state is a commonwealth with conditionals for each potential value. This requires multiple conditionals, grouped together with OR `||` operator.

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

Whereas in the previous example we used the value of the matched property, here we are checking if the property is in the map & _truthy_. If there is no match for the variable, like for `commonwealths['NJ']`, then its returned value is a falsy _undefined_.

This pattern is more abstract than a straight set of conditionals. But the benefit is greater readability. Parsing complex conditionals is difficult. Using a hash map reduces the complexity by asking _Is this value in the list?_

## Functions in hash maps


<p>Let's switch things up and look at different demo.</p>

<!-- html-in-md </div> -->

<div class="duo code-compare">
  <div class="duo__cell code-compare__nay">
    ``` js
    var resultNumber;
    if ( operator == 'add' ) {
      resultNumber = a + b;
    } else if ( operator == 'subtract' ) {
      resultNumber = a - b;
    } else if ( operator == 'multiply' ) {
      resultNumber = a \* b;
    } else if ( operator == 'divide' ) {
      resultNumber = a / b;
    }
    ```
  </div>
  <div class="duo__cell code-compare__yay">
    ``` js
    var operations = {
      add: function( a, b ) {
        return a + b;
      },
      subtract: function( a, b ) {
        return a - b;
      },
      multiply: function( a, b ) {
        return a * b;
      },
      divide: function( a, b ) {
        return a / b;
      },
    };

    var resultNumber = operation( a, b );
    ```
  </div>
</div>

<!-- html-in-md <div class="skinny-column"> -->

<p data-height="300" data-theme-id="dark" data-slug-hash="28905ad8756fe1a4bb3033d70fed52a2" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="Calculator" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/28905ad8756fe1a4bb3033d70fed52a2/">Calculator</a> by David DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

<p>This example is a simple calculator comprised of two input fields and an operator selector. Selecting an operator changes the calculation of the two numbers.</p>

<p>The initial code uses a chain of conditionals to check the operator. The revised code uses a hash map. Instead of string or boolean values, this hash map has functions. Since JavaScript is an object-oriented language, you can use functions as values.</p>

``` js
// get the function to be used in the operation
var operation = operations[ operator ];
// call that function
var resultNumber = operation( a, b );
```

<!-- html-in-md </div> -->