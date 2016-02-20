'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRootPageReducer;

var _types = require('../action/types');

var _creators = require('../action/creators');

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _drop = require('lodash/drop');

var _drop2 = _interopRequireDefault(_drop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setChildPagePropsAtPath(path, props, state) {
  var sel = state;
  (0, _map2.default)(path, function (key) {
    sel = (0, _find2.default)(sel.props.childPages, function (p) {
      return p.key === key;
    });
  });
  sel.props = (0, _assign2.default)({}, sel.props, props);
  return state;
}

function replaceChildPagePropsAtPath(path, props, state) {
  var sel = state;
  (0, _map2.default)(path, function (key) {
    sel = (0, _find2.default)(sel.props.childPages, function (p) {
      return p.key === key;
    });
  });
  sel.props = props;
  return state;
}

function createRootPageReducer(initialState) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
      case _types.SET_PAGE_PROPS:
        {
          var _action$payload = action.payload;
          var path = _action$payload.path;
          var props = _action$payload.props;

          if (path[0] === state.key) {
            return setChildPagePropsAtPath((0, _drop2.default)(path), props, (0, _cloneDeep2.default)(state));
          }
          return state;
        }
      case _types.REPLACE_PAGE_PROPS:
        {
          var _action$payload2 = action.payload;
          var path = _action$payload2.path;
          var props = _action$payload2.props;

          if (path[0] === state.key) {
            return replaceChildPagePropsAtPath((0, _drop2.default)(path), props, (0, _cloneDeep2.default)(state));
          }
          return state;
        }
      default:
        return state;
    }
  };
}