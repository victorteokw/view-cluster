import {PRESENT_MODAL, DISMISS_MODAL} from './types';

export function presentModal(path, page) {
  return {
    type: 'PRESENT_MODAL',
    payload: {
      path: path,
      page: page
    }
  }
}

export function dismissModal(path, key) {
  return {
    type: 'DISMISS_MODAL',
    payload: {
      path: path,
      key: key
    }
  }
}