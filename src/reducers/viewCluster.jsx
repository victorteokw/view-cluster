import modals from './modals';
import stack from './stack';
import tabs from './tabs';

let reducers = {modals, stack, tabs};

import pathToArray from '../utils/pathToArray';
import selectIt from '../utils/selectIt';
import setIt from '../utils/setIt';

import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import dropRight from 'lodash/dropRight';

export default function viewCluster(state = {}, action) {
  let path = cloneDeep(pathToArray(action.payload.path));
  let selector = state;
  let subSelector = state;
  let func = undefined;
  let removeLastSegment = false;
  each(path, (segment) => {
    if (/tabs|stack|modals|viewCluster/.test(segment)) {
      subSelector = selector = selectIt(subSelector, segment);
      func = reducers[segment];
      removeLastSegment  = false;
    } else {
      subSelector = selectIt(subSelector, segment);
      removeLastSegment = true;
    }
  });
  return func ? setIt(cloneDeep(state), removeLastSegment ? dropRight(path) : path, func(selector, action)) : state;
}