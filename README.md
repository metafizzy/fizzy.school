# fizzy.school

_Lessons in JavaScript for anyone writing jQuery_. Site source.

[fizzy.school](https://fizzy.school)

## Install

Building these docs requires [npm](https://npmjs.com) and [Bower](https://bower.io).

``` bash
npm install
bower install
```

## Tasks

+ `gulp` - build the production site, concatenate CSS and JS, minify JS
+ `gulp dev` - build the site, but use separate CSS and JS files for debugging

## Structure

+ `assets/` - files that get copied into `build/`
+ `build/` - where static site gets built
+ `content/` - page content
+ `css/`  - boilerplate CSS
+ `layouts/` - page templates
+ `js/` - boilerplate JS
+ `modules/` - See Modules below
+ `tasks/` - Gulp tasks to build the site

## Modules

Modules are re-usable components used throughout the site. A module may consist of template, JS, and CSS files.

    modules/
      page-nav/
        page-nav.css
        page-nav.js
        page-nav.hbs

[BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) is used for CSS code style.

``` css
.page-nav {} /* block */
.page-nav__item {} /* element, child */
.page-nav--dark {} /* modifier */
```

JavaScript can be initialized for each element with `data-js` attribute.

``` html
<div class="page-nav" data-js="page-nav">
```

``` js
FizzySchool['page-nav'] = function( elem ) {
  // do something with elem
};
```

---

By [Metafizzy](https://metafizzy.co)
