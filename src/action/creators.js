import * as types from './types';

//export function selectTab(path) {
//  return {
//    type: types.SELECT_TAB,
//    payload: {
//      path
//    }
//  };
//}
//
//export function addTab(path, desc) {
//  return {
//    type: types.ADD_TAB,
//    payload: {
//      path,
//      desc
//    }
//  };
//}
//
//export function removeTab(path) {
//  return {
//    type: types.REMOVE_TAB,
//    payload: {
//      path
//    }
//  };
//}
//
//export function setTabs(path, tabs) {
//  return {
//    type: types.SET_TABS,
//    payload: {
//      path,
//      tabs
//    }
//  };
//}
//
//export function presentModal(path, desc) {
//  return {
//    type: types.PRESENT_MODAL,
//    payload: {
//      path,
//      desc
//    }
//  };
//}
//
//export function dismissModal(path) {
//  return {
//    type: types.DISMISS_MODAL,
//    payload: {
//      path
//    }
//  };
//}
//
//export function pushStack(path, desc) {
//  return {
//    type: types.PUSH_STACK,
//    payload: {
//      path,
//      desc
//    }
//  };
//}
//
//export function popStack(path) {
//  return {
//    type: types.POP_STACK,
//    payload: {
//      path
//    }
//  };
//}
//
//export function setStack(path, stack) {
//  return {
//    type: types.SET_STACK,
//    payload: {
//      path,
//      stack
//    }
//  };
//}

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