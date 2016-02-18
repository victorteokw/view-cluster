import isArray from '../../node_modules/lodash/isArray';
import find from '../../node_modules/lodash/find';

function _selectIt(selector, segment) {
  if (isArray(selector)) {
    if (/^\d+$/.test(segment)) {
      return selector[segment];
    } else {
      return find(selector, (i) => i.key === segment);
    }
  }
  return selector[segment];
}

export default function selectIt(selector, path) {
  if (isArray(path)) {
    return path.reduce((selector, segment) => _selectIt(selector, segment), selector);
  } else {
    return _selectIt(selector, path);
  }
}