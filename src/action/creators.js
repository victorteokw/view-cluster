import * as types from './types';

export function setPageProps(path, props) {
  return {
    type: types.SET_PAGE_PROPS,
    payload: {
      path,
      props
    }
  }
}

export function replacePageProps(path, props) {
  return {
    type: types.REPLACE_PAGE_PROPS,
    payload: {
      path,
      props
    }
  }
}