import isArray from 'lodash/isArray';

function _selectIt(selector, segment) {
  if (isArray(selector)) {
    return selector[segment] || find(selector, (i) => i.key === segment);
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