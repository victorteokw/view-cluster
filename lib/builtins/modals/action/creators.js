'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presentModal = presentModal;
exports.dismissModal = dismissModal;

var _types = require('./types');

function presentModal(path, page) {
  return {
    type: 'PRESENT_MODAL',
    payload: {
      path: path,
      page: page
    }
  };
}

function dismissModal(path, key) {
  return {
    type: 'DISMISS_MODAL',
    payload: {
      path: path,
      key: key
    }
  };
}