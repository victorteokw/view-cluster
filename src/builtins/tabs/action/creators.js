import {SELECT_TAB} from './types';

export function selectTab(path, key) {
  return {
    type: SELECT_TAB,
    payload: {
      path: path,
      key: key
    }
  }
}