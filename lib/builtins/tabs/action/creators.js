'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTab = selectTab;

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