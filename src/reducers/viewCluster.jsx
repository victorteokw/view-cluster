import modals from './modals';
import stack from './stack';
import tabs from './tabs';

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
      func = this[segment];
    } else {
      subSelector = selectIt(subSelector, segment);
    }
  });

  let newSubState = func(selector, action);
  return setIt(state, path, newSubState);
}