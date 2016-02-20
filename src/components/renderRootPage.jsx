import React from 'react';
import * as defaultPages from './pages';

import merge from 'lodash/merge';

export default function renderRootPage(state, pages, dispatch, children = null) {
  pages = merge({}, pages, defaultPages);
  let Page = pages[state.page];
  let props = state.props;
  return <Page path={[state.key]} {...props} pages={pages} dispatch={dispatch} root={true}>
    {children}
  </Page>
}