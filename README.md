# view-cluster
[![build status](https://travis-ci.org/cheunghy/view-cluster.svg)](https://travis-ci.org/cheunghy/view-cluster)

[![current version](https://badge.fury.io/js/view-cluster.svg)](https://www.npmjs.com/package/view-cluster)

Aim to be the best solution for iOS style app in browser.

It has supports for tab bar, navigation bar, and modals.

The building block of view cluster is page.

React.Component behaves like UIView in iOS,

Page behaves like UIViewController in iOS,

container page behaves like container view controller in iOS.

Pages work together as pathed pages. With container page at the root, content page at the leaves.

A page state looks like this:

``` js
let page = {
  "key": "stack-page",
  page: 'StackPage',
  props: {
    childPages: [
      {
        key: 'home-page',
        page: 'HomePage',
        props: {}
      }
    ]
  }
}
```

## Installation

``` bash
npm install view-cluster
```

view-cluster works with
+ node.js 0.11 or above
+ react.js 0.14
+ redux 3