import modals from './modals';
import stack from './stack';
import tabs from './tabs';

let reducers = {modals, stack, tabs};

import pathToArray from '../utils/pathToArray';
import selectIt from '../utils/selectIt';
import setIt from '../utils/setIt';

import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';

export default function viewCluster(state = {}, action) {
  let path = cloneDeep(pathToArray(action.payload.path));
  let selector = state;
  let subSelector = state;
  let func = undefined;
  each(path, (segment) => {
    if (/tabs|stack|modals|viewCluster/.test(segment)) {
      subSelector = selector = selectIt(subSelector, segment);
      func = reducers[segment];
    } else {
      subSelector = selectIt(subSelector, segment);
    }
  });
  return func ? setIt(state, path, func(selector, action)) : state;
}