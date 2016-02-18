//import {PUSH_STACK, POP_STACK, SET_STACK} from '../action/types';
//
//import concat from 'lodash/concat';
//import dropRight from 'lodash/dropRight';
//import cloneDeep from 'lodash/cloneDeep';
//
//export default function stack(state = [], action) {
//  let {desc, stack} = action.payload;
//  switch (action.type) {
//    case PUSH_STACK: {
//      return concat(cloneDeep(state), desc);
//    }
//    case POP_STACK: {
//      return dropRight(cloneDeep(state));
//    }
//    case SET_STACK: {
//      return stack;
//    }
//    default:
//      return state;
//  }
//}