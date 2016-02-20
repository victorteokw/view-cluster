import React from 'react';
import * as builtinPages from './builtinPages';

import assign from 'lodash/assign';

export default function renderRootPage(state, pages, dispatch, children = null) {
  pages = assign({}, pages, builtinPages);
  let Page = pages[state.page];
  let props = state.props;
  return <Page path={[state.key]} {...props} pages={pages} dispatch={dispatch} root={true}>
    {children}
  </Page>
}