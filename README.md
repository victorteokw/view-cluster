# view-cluster
[![build status](https://travis-ci.org/cheunghy/view-cluster.svg)](https://travis-ci.org/cheunghy/view-cluster)

[![current version](https://badge.fury.io/js/view-cluster.svg)](https://www.npmjs.com/package/view-cluster)

Aim to be the best solution for iOS style app in browser.

Do not use this yet! Not finished implementing.

## Installation

``` bash
npm install view-cluster
```

view-cluster works with
+ node.js 0.11 or above
+ react.js 0.14
+ redux 3

## Documentation

### Descriptor

#### View Cluster

A view cluster object is a top level page manager.
``` js
let viewCluster = {
  "key": "root",
  // REQUIRED key should be unique, and matches /^[\w-_]*[a-zA-Z]+[\w-_]*$/
  "tabs": tabs
  // OPTIONAL array of tabs
  "stack": stack
  // OPTIONAL stack
  "page": page
  // OPTIONAL page
  "modals": modals
  // OPTIONAL array of modals
};
```

#### Tab

A tab object represents a tab.
``` js
let tab = {
  "key": "artist",
  // REQUIRED key should be unique, and matches /^[\w-_]*[a-zA-Z]+[\w-_]*$/
  "title": "Artist",
  // OPTIONAL used to show tab title
  "icon": "artist-icon.png"
  // OPTIONAL used to show tab icon
  "highlightIcon": "artist-highlight-icon.png"
  // OPTIONAL used to show tab icon when selected
  "stack": stack
  // OPTIONAL stack
  "page": page
  // OPTIONAL page
};
```

#### Stack

A stack is an array of pages.
``` js
let stack = [page1, page2];
```

#### Modal

A modal represents modal. It may contain a page or a sub view cluster.
``` js
let modal = {
  "key": "shopping-cart",
  // REQUIRED key should be unique, and matches /^[\w-_]*[a-zA-Z]+[\w-_]*$/
  "page": page,
  // OPTIONAL page
  "tabs": tabs,
  // OPTIONAL tabs
  "stack": stack,
  // OPTIONAL stack
  "viewCluster": viewCluster
  // OPTIONAL view cluster, not recommended to do this
};
```

#### Page

A page represents a page.
``` js
let page = {
  "key": "songs-page",
  // REQUIRED key should be unique, and matches /^[\w-_]*[a-zA-Z]+[\w-_]*$/
  page: 'SongsPage',
  // REQUIRED the page component name
  props: {}
  // The props to pass to page
}
```

### Path

All actions receives path.

You can write path like this:
``` js
'tabs.home.stack'
```
Or like this:
``` js
['tabs', 'home', 'stack']
```
It may be similar to this:
``` js
['tabs', 0, 'stack']
```
And this:
``` js
'tabs.0.stack'
```

### Pages

First level pages.

React.Component behaves like UIView in iOS,

Page behaves like UIViewController in iOS,

container page behaves like container view controller in iOS.