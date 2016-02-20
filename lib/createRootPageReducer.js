'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRootPageReducer;

var _types = require('./action/types');

var _creators = require('./action/creators');

var _pageActions = require('./pageActions');

var _pageActions2 = _interopRequireDefault(_pageActions);

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

function subStateAtPath(state, path) {
  var sel = state;
  (0, _map2.default)(path, function (key) {
    sel = (0, _find2.default)(sel.props.childPages, function (p) {
      return p.key === key;
    });
  });
  return sel;
}

function setChildPagePropsAtPath(path, props, state) {
  var sel = subStateAtPath(state, path);
  sel.props = (0, _assign2.default)({}, sel.props, props);
  return state;
}

function replaceChildPagePropsAtPath(path, props, state) {
  var sel = subStateAtPath(state, path);
  sel.props = props;
  return state;
}

function applyTransformer(transformer, state, action) {
  var path = action.payload.path;

  var subState = subStateAtPath(state, (0, _drop2.default)(path));
  var newAction = (0, _cloneDeep2.default)(action);
  delete newAction.payload.path;
  return replaceChildPagePropsAtPath((0, _drop2.default)(path), transformer(subState.props, action), state);
}

function createRootPageReducer(initialState) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    if (!action.payload || !action.payload.path) return state;
    var _action$payload = action.payload;
    var path = _action$payload.path;
    var props = _action$payload.props;

    if (path[0] !== state.key) return state;
    switch (action.type) {
      case _types.SET_PAGE_PROPS:
        return setChildPagePropsAtPath((0, _drop2.default)(path), props, (0, _cloneDeep2.default)(state));
      case _types.REPLACE_PAGE_PROPS:
        return replaceChildPagePropsAtPath((0, _drop2.default)(path), props, (0, _cloneDeep2.default)(state));
      default:
        if (action.type in _pageActions2.default) {
          var transformer = _pageActions2.default[action.type];
          return applyTransformer(transformer, (0, _cloneDeep2.default)(state), action);
        }
        return state;
    }
  };
}