import React from 'react';
import * as defaultPages from './pages';

import merge from 'lodash/merge';

export default function renderRootPage(state, pages, dispatch) {
  pages = merge({}, pages, defaultPages);
  let Page = pages[state.page];
  let props = state.props;
  return <Page path={[]} {...props} pages={pages} dispatch={dispatch} root={true} />
}