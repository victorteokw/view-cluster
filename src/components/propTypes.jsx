import React from 'react';

import pipe from '../utils/pipe';

function defaultPipe(arg) {
  return arg;
}

function addKey(propTypes) {
  propTypes.key = React.PropTypes.string.isRequired;
  return propTypes;
}

export function removeKey(propTypes) {
  delete propTypes.key;
  return propTypes;
}

function tabsInside(propTypes) {
  propTypes.tabs = tabsPropTypes;
  return propTypes;
}

function modalsInside(propTypes) {
  propTypes.modals = modalsPropTypes;
  return propTypes;
}

function stackInside(propTypes) {
  propTypes.stack = stackPropTypes;
  return propTypes;
}

function pageInside(propTypes) {
  propTypes.page = pagePropTypes;
  return propTypes;
}

export let pagePropTypes = pipe({
  page: React.PropTypes.string.isRequired,
  props: React.PropTypes.object.isRequired
}, addKey);

export let pageDefaultProps = {
  props: {}
};

export let pureTabPropTypes = {
  title: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool.isRequired,
  icon: React.PropTypes.string.isRequired,
  highlightIcon: React.PropTypes.string.isRequired
};

export let tabPropTypes = pipe(pureTabPropTypes, addKey, stackInside, pageInside);

export let tabDefaultProps = {
  selected: false
};

let tabsPropTypes = React.PropTypes.arrayOf(
  React.PropTypes.shape(tabPropTypes)
);

export let pureModalPropTypes = {};

export let modalPropTypes = pipe(pureModalPropTypes, addKey, tabsInside, stackInside, pageInside);

export let modalDefaultProps = {};

let modalsPropTypes = React.PropTypes.arrayOf(
  React.PropTypes.shape(modalPropTypes)
);

let stackPropTypes = React.PropTypes.arrayOf(
  React.PropTypes.shape(pagePropTypes)
);

export let viewClusterPropTypes = pipe({
  pages: React.PropTypes.arrayOf(
    React.PropTypes.instanceOf(React.Component)
  ).isRequired,
  navigationItemTransformer: React.PropTypes.func,
  tabItemTransformer: React.PropTypes.func
}, addKey, tabsInside, modalsInside, stackInside, pageInside);

export let viewClusterDefaultProps = {
  navigationItemTransformer: defaultPipe,
  tabItemTransformer: defaultPipe
};