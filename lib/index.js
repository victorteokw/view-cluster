'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = exports.renderRootPage = exports.createRootPage = undefined;

var _createRootPage = require('./reducers/createRootPage');

var _createRootPage2 = _interopRequireDefault(_createRootPage);

var _renderRootPage = require('./components/renderRootPage');

var _renderRootPage2 = _interopRequireDefault(_renderRootPage);

var _Page = require('./components/Page');

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createRootPage = _createRootPage2.default;
exports.renderRootPage = _renderRootPage2.default;
exports.Page = _Page2.default;