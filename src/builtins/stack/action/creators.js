import {PUSH_STACK, POP_STACK} from './types';

export function pushStack(path, page) {
  return {
    type: PUSH_STACK,
    payload: {
      path: path,
      page: page
    }
  }
}

export function popStack(path) {
  return {
    type: POP_STACK,
    payload: {
      path: path
    }
  }
}