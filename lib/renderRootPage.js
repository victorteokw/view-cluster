'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderRootPage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builtinPages = require('./builtinPages');

var builtinPages = _interopRequireWildcard(_builtinPages);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderRootPage(state, pages, dispatch) {
  var children = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  pages = (0, _assign2.default)({}, pages, builtinPages);
  var Page = pages[state.page];
  var props = state.props;
  return _react2.default.createElement(
    Page,
    _extends({ path: [state.key] }, props, { pages: pages, dispatch: dispatch, root: true }),
    children
  );
}