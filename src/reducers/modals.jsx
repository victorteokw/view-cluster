import {PRESENT_MODAL, DISMISS_MODAL} from '../action/types';

import cloneDeep from 'lodash/cloneDeep';
import last from 'lodash/last';
import concat from 'lodash/concat';

export default function modals(state = [], action) {
  let {path, desc} = action.payload;
  switch (action.type) {
    case PRESENT_MODAL: {
      return concat(cloneDeep(state), desc);
    }
    case DISMISS_MODAL: {
      return filter(cloneDeep(state), (m) => m.key !== last(path).modal);
    }
    default:
      return state;
  }
}