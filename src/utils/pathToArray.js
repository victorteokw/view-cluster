import isArray from 'lodash/isArray';

export default function pathToArray(path) {
  return isArray(path) ? path : path.split('.');
}