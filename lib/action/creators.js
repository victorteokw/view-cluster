'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPageProps = setPageProps;
exports.replacePageProps = replacePageProps;

var _types = require('./types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setPageProps(path, props) {
  return {
    type: types.SET_PAGE_PROPS,
    payload: {
      path: path,
      props: props
    }
  };
}

function replacePageProps(path, props) {
  return {
    type: types.REPLACE_PAGE_PROPS,
    payload: {
      path: path,
      props: props
    }
  };
}