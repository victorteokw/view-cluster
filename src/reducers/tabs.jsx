import {ADD_TAB, REMOVE_TAB, SET_TABS, SELECT_TAB} from '../action/types';

import cloneDeep from 'lodash/cloneDeep';
import last from 'lodash/last';
import each from 'lodash/each';

export default function tabs(state = [], action) {
  let {path, desc, tabs} = action.payload;
  switch (action.type) {
    case ADD_TAB: {
      return cloneDeep(state).splice(last(path).index, 0, desc);
    }
    case REMOVE_TAB: {
      return cloneDeep(state).splice(last(path).index, 1);
    }
    case SET_TABS: {
      return tabs;
    }
    case SELECT_TAB: {
      return each(cloneDeep(state), (t) => t.selected = t.key === last(path).tab);
    }
    default:
      return state;
  }
}