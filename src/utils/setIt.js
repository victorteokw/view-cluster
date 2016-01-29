import selectIt from './selectIt';
import pathToArray from './pathToArray';

import dropRight from 'lodash/dropRight';
import last from 'lodash/last';

export default function setIt(o, p, v) {
  p = pathToArray(p);
  let setter = selectIt(o, dropRight(p));
  setter[last(p)] = v;
  return o;
}