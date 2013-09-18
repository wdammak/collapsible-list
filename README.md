collapsable-list
================

a jQuery plugin to collapse and search nested lists (2 levels)

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

```javascript
$('#my-list').collapsableList('.header');
```

```javascript
$('#my-list').collapsableList('.header', {search: false});
```


Options
--------

*   `search`: one of `true`, `false` or a `jQuery` instance

    When `true`, creates and add a search field at the top of the list. When `false`, no search field is added. When it's a `jQuery`instance, this field will be used for the search and key handlers will be set on it.
