import modals from './modals';
import stack from './stack';
import tabs from './tabs';
import page from './page';

let reducers = {modals, stack, tabs, page};

import * as types from '../action/types';

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
      if (action.type === types.SET_PAGE_PROPS) {
        func = page;
        removeLastSegment = false;
        selector = subSelector;
      }
    }
  });

  return func ? setIt(cloneDeep(state), removeLastSegment ? dropRight(path) : path, func(selector, action)) : state;
}