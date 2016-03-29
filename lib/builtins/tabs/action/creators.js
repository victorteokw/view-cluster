'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTab = selectTab;
exports.pushSelectedStack = pushSelectedStack;
exports.popSelectedStack = popSelectedStack;

var _types = require('./types');

function selectTab(path, key) {
  return {
    type: _types.SELECT_TAB,
    payload: {
      path: path,
      key: key
    }
  };
}

function pushSelectedStack(path, page) {
  return {
    type: _types.PUSH_SELECTED_STACK,
    payload: {
      path: path,
      page: page
    }
  };
}

function popSelectedStack(path) {
  return {
    type: _types.POP_SELECTED_STACK,
    payload: {
      path: path
    }
  };
}