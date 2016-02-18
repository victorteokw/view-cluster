import isArray from '../../node_modules/lodash/isArray';

export default function pathToArray(path) {
  return isArray(path) ? path : path.split('.');
}