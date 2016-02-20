'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addPageAction;

var _pageActions = require('./pageActions');

var _pageActions2 = _interopRequireDefault(_pageActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addPageAction(type, transformer) {
  _pageActions2.default[type] = transformer;
};