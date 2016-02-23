import {SELECT_TAB, PUSH_SELECTED_STACK} from './types';

export function selectTab(path, key) {
  return {
    type: SELECT_TAB,
    payload: {
      path: path,
      key: key
    }
  }
}

export function pushSelectedStack(path, page) {
  return {
    type: PUSH_SELECTED_STACK,
    payload: {
      path: path,
      page: page
    }
  }
}