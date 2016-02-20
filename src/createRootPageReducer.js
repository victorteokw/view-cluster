import {SET_PAGE_PROPS, REPLACE_PAGE_PROPS} from './action/types';
import {setPageProps, replacePageProps} from './action/creators';

import map from 'lodash/map';
import find from 'lodash/find';
import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
import drop from 'lodash/drop';

function setChildPagePropsAtPath(path, props, state) {
  let sel = state;
  map(path, (key) => {
    sel = find(sel.props.childPages, (p) => p.key === key);
  });
  sel.props = assign({}, sel.props, props);
  return state;
}

function replaceChildPagePropsAtPath(path, props, state) {
  let sel = state;
  map(path, (key) => {
    sel = find(sel.props.childPages, (p) => p.key === key);
  });
  sel.props = props;
  return state;
}

export default function createRootPageReducer(initialState) {
  return function (state = initialState, action) {
    switch (action.type) {
      case SET_PAGE_PROPS: {
        let {path, props} = action.payload;
        if (path[0] === state.key) {
          return setChildPagePropsAtPath(drop(path), props, cloneDeep(state));
        }
        return state;
      }
      case REPLACE_PAGE_PROPS: {
        let {path, props} = action.payload;
        if (path[0] === state.key) {
          return replaceChildPagePropsAtPath(drop(path), props, cloneDeep(state));
        }
        return state;
      }
      default:
        return state;
    }
  };
}