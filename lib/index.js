'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = exports.addPageAction = exports.renderRootPage = exports.createRootPageReducer = undefined;

var _createRootPageReducer = require('./createRootPageReducer');

var _createRootPageReducer2 = _interopRequireDefault(_createRootPageReducer);

var _renderRootPage = require('./renderRootPage');

var _renderRootPage2 = _interopRequireDefault(_renderRootPage);

var _addPageAction = require('./addPageAction');

var _addPageAction2 = _interopRequireDefault(_addPageAction);

var _Page = require('./builtins/Page');

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createRootPageReducer = _createRootPageReducer2.default;
exports.renderRootPage = _renderRootPage2.default;
exports.addPageAction = _addPageAction2.default;
exports.Page = _Page2.default;