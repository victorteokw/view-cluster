'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushStack = pushStack;
exports.popStack = popStack;

var _types = require('./types');

function pushStack(path, page) {
  return {
    type: _types.PUSH_STACK,
    payload: {
      path: path,
      page: page
    }
  };
}

function popStack(path) {
  return {
    type: _types.POP_STACK,
    payload: {
      path: path
    }
  };
}