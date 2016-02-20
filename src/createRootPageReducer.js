import {SET_PAGE_PROPS, REPLACE_PAGE_PROPS} from './action/types';
import {setPageProps, replacePageProps} from './action/creators';
import pageActions from './pageActions';

import map from 'lodash/map';
import find from 'lodash/find';
import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
import drop from 'lodash/drop';

function subStateAtPath(state, path) {
  let sel = state;
  map(path, (key) => {
    sel = find(sel.props.childPages, (p) => p.key === key);
  });
  return sel;
}

function setChildPagePropsAtPath(path, props, state) {
  let sel = subStateAtPath(state, path);
  sel.props = assign({}, sel.props, props);
  return state;
}

function replaceChildPagePropsAtPath(path, props, state) {
  let sel = subStateAtPath(state, path);
  sel.props = props;
  return state;
}

function applyTransformer(transformer, state, action) {
  let {path} = action.payload;
  let subState = subStateAtPath(state, drop(path));
  let newAction = cloneDeep(action);
  delete newAction.payload.path;
  return replaceChildPagePropsAtPath(drop(path), transformer(subState.props, action), state);
}

export default function createRootPageReducer(initialState) {
  return function (state = initialState, action) {
    if (!action.payload || !action.payload.path) return state;
    let {path, props} = action.payload;
    if (path[0] !== state.key) return state;
    switch (action.type) {
      case SET_PAGE_PROPS:
        return setChildPagePropsAtPath(drop(path), props, cloneDeep(state));
      case REPLACE_PAGE_PROPS:
        return replaceChildPagePropsAtPath(drop(path), props, cloneDeep(state));
      default:
        if (action.type in pageActions) {
          let transformer = pageActions[action.type];
          return applyTransformer(transformer, cloneDeep(state), action);
        }
        return state;
    }
  };
}