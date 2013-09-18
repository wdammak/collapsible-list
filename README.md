collapsable-list
================

a jQuery plugin to collapse and search nested lists (2 levels)

Demo
-----

[On this page](http://sebastien-roch.github.io/collapsable-list/demo.html)

Usage
------

Markup example:

```html
<ul id="my-list">
    <li class="header">A</li>
    <ul>
        <li>Australia</li>
        <li>Austria</li>
    </ul>
    <li class="header">B</li>
    <ul>
        <li>Bahamas, The</li>
        <li>Bahrain</li>
    </ul>
</ul>
```

Javascript code:

The first argument is a selector to get the headers of each sub-list. The second are the options.

```javascript
$('#my-list').collapsableList('.header');
```

```javascript
$('#my-list').collapsableList('.header', {search: false});
```

Search
---------
The search is case insensitive and does not have to start from the beginning of the word (e.g. 'merica' will match 'America').

If the filtered nested sub-lists result in having no items after a search, the header is hidden.

`ESC` will clear the search field and remove the focus (blur). If some sub-lists were collapsed, the state is stored before the search and restored when the search field is empty or if you press `ESC`.

Options
--------

*   `search`: one of `true`, `false` or a `jQuery` instance

    When `true`, creates and add a search field at the top of the list. When `false`, no search field is added. When it's a `jQuery`instance, this field will be used for the search and key handlers will be set on it.

