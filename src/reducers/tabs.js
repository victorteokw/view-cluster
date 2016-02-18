//import {ADD_TAB, REMOVE_TAB, SET_TABS, SELECT_TAB} from '../action/types';
//
//import pathToArray from '../utils/pathToArray';
//
//import cloneDeep from 'lodash/cloneDeep';
//import last from 'lodash/last';
//import tap from 'lodash/tap';
//import filter from 'lodash/filter';
//
//export default function tabs(state = [], action) {
//  let {path, desc, tabs} = action.payload;
//  path = pathToArray(path);
//  switch (action.type) {
//    case ADD_TAB: {
//      return tap(cloneDeep(state), (s) => s.splice(last(path), 0, desc));
//    }
//    case REMOVE_TAB: {
//      if (last(path).match(/\d+/)) {
//        return tap(cloneDeep(state), (s) => s.splice(last(path), 1));
//      } else {
//        return filter(cloneDeep(state), (t) => t.key !== last(path));
//      }
//    }
//    case SET_TABS: {
//      return tabs;
//    }
//    case SELECT_TAB: {
//      let newState = cloneDeep(state);
//      newState.map((t, i) => {
//        t.selected = t.key === last(path) || i == last(path);
//        return t;
//      });
//      return newState;
//    }
//    default:
//      return state;
//  }
//}