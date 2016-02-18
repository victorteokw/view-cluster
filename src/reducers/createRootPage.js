import {SET_PAGE_PROPS, REPLACE_PAGE_PROPS} from '../action/types';
import {setPageProps, replacePageProps} from '../action/creators';

import map from 'lodash/map';
import find from 'lodash/find';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

function setChildPagePropsAtPath(path, props, state) {
  let sel = state;
  map(path, (key) => {
    sel = find(sel.props.childPages, (p) => p.key === key);
  });
  sel.props = merge({}, sel.props, props);
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

export default function createRootPage(initial) {
  return function (state = initial, action) {
    switch (action.type) {
      case SET_PAGE_PROPS: {
        let {path, props} = action.payload;
        return setChildPagePropsAtPath(path, props, cloneDeep(state));
      }
      case REPLACE_PAGE_PROPS: {
        let {path, props} = action.payload;
        return replaceChildPagePropsAtPath(path, props, cloneDeep(state));
      }
      default:
        return state;
    }
  };
}