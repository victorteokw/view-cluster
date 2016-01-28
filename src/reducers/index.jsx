import * as actionTypes from '../action/types';

import cloneDeep from 'lodash/cloneDeep';
import last from 'lodash/last';
import each from 'lodash/each';
import concat from 'lodash/concat';
import dropRight from 'lodash/dropRight';
import find from 'lodash/find';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';

function pathToArray(path) {
  return path.split('.');
}

function select(selector, segment) {
  if (isArray(selector)) {
    return selector[segment] || find(selector, (i) => i.key === segment);
  }
  return selector[segment];
}

export function tabs(state = [], action) {
  let {path, desc, tabs} = action.payload;
  switch (action.type) {
    case actionTypes.ADD_TAB: {
      return cloneDeep(state).splice(last(path).index, 0, desc);
    }
    case actionTypes.REMOVE_TAB: {
      return cloneDeep(state).splice(last(path).index, 1);
    }
    case actionTypes.SET_TABS: {
      return tabs;
    }
    case actionTypes.SELECT_TAB: {
      return each(cloneDeep(state), (t) => t.selected = t.key === last(path).tab);
    }
    default:
      return state;
  }
}

export function stack(state = [], action) {
  let {desc, stack} = action.payload;
  switch (action.type) {
    case actionTypes.PUSH_STACK: {
      return concat(cloneDeep(state), desc);
    }
    case actionTypes.POP_STACK: {
      return dropRight(cloneDeep(state));
    }
    case actionTypes.SET_STACK: {
      return stack;
    }
    default:
      return state;
  }
}

export function modals(state = [], action) {
  let {path, desc} = action.payload;
  switch (action.type) {
    case actionTypes.PRESENT_MODAL: {
      return concat(cloneDeep(state), desc);
    }
    case actionTypes.DISMISS_MODAL: {
      return filter(cloneDeep(state), (m) => m.key !== last(path).modal);
    }
    default:
      return state;
  }
}

function viewCluster(state = {}, action) {
  let path = cloneDeep(action.payload.path);
  let selector = state;
  let func = undefined;
  each(path, (p) => {
    let k = p.keys[0], v = p[k];
    switch (k) {
      case 'tab': {
        selector = selector.tabs;
        func = tabs;
        break;
      }
      case 'modal': {
        selector = selector.modals;
        func = modals;
        break;
      }
      case 'stack': {
        selector = selector.stack;
        func = stack;
        break;
      }
      case 'viewCluster': {
        selector = selector.viewCluster;
        func = viewCluster;
        break;
      }
    }
  });
  let transform = func(selector, action);

}
