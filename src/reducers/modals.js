//import {PRESENT_MODAL, DISMISS_MODAL} from '../action/types';
//
//import pathToArray from '../utils/pathToArray';
//
//import cloneDeep from 'lodash/cloneDeep';
//import last from 'lodash/last';
//import concat from 'lodash/concat';
//import filter from 'lodash/filter';
//
//export default function modals(state = [], action) {
//  let {path, desc} = action.payload;
//  path = pathToArray(path);
//  switch (action.type) {
//    case PRESENT_MODAL: {
//      return concat(cloneDeep(state), desc);
//    }
//    case DISMISS_MODAL: {
//      return filter(cloneDeep(state), (m) => m.key !== last(path));
//    }
//    default:
//      return state;
//  }
//}