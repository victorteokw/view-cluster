import selectIt from './selectIt';
import pathToArray from './pathToArray';

import dropRight from 'lodash/dropRight';
import last from 'lodash/last';
import isArray from 'lodash/isArray';
import findIndex from 'lodash/findIndex';

export default function setIt(o, p, v) {
  p = pathToArray(p);
  let setter = selectIt(o, dropRight(p));
  if (isArray(setter) && !/^\d$/.test(last(p))) {
    let index = findIndex(setter, {key: last(p)});
    setter.splice(index, 1, v);
  } else {
    setter[last(p)] = v;
  }
  return o;
}