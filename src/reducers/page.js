import {SET_PAGE_PROPS} from '../action/types';
import merge from 'lodash/merge';

export default function page(state, action) {
  switch (action.type) {
    case SET_PAGE_PROPS: {
      return {page: state.page, key: state.key, props: merge({}, state.props, action.payload.props)};
    }
    default:
      return state;
  }
}