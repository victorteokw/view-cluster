import React from 'react';
import ReactTransitionGroup from '../ReactTransitionGroup';
import Page from '../Page';
import ModalView from './ModalView';

import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import last from 'lodash/last';

import addPageAction from '../../addPageAction';
import {PRESENT_MODAL, DISMISS_MODAL} from './action/types';
import {presentModal, dismissModal} from './action/creators';

addPageAction(PRESENT_MODAL, function(props, action) {
  props.childPages.push(action.payload.page);
  return props;
});

addPageAction(DISMISS_MODAL, function(props, action) {
  filter(props.childPages, (p) => p.key !== action.payload.key);
  return props;
});

Page.prototype.presentModal = function(props) {
  if (this.superPage) {
    this.superPage.presentModal(props);
  }
};

Page.prototype.dismissModal = function(key) {
  if (this.superPage) {
    this.superPage.dismissModal(key);
  }
};

export default class ModalsPage extends Page {

  static propTypes = {
    childPages: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        page: React.PropTypes.string.isRequired,
        props: React.PropTypes.object
      })
    )
  };

  constructor(props, context) {
    super(props, context);
    this.noLazyLoading();
  }

  renderPage() {
    return <ReactTransitionGroup component="div" className="modals-page">
      {
        this.props.childPages.map((m) => {
          return <ModalView key={m.key}>
            {this.pageRender(m)}
          </ModalView>
        })
      }
    </ReactTransitionGroup>
  }

  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    let currentSelectedKey = this.getSelectedPageKey();
    let previousSelectedKey = this.getSelectedPageKey(prevProps);
    if (currentSelectedKey !== previousSelectedKey) {
      if (this.getSelectedPage()) {
        this.getSelectedPage().pageWillAppear();
      }
      if (this.pages[previousSelectedKey]) {
        this.pages[previousSelectedKey].pageWillDisappear();
      }
    }
  }

  getSelectedPage() {
    return this.unwrapPage(this.pages[this.getSelectedPageKey()]);
  }

  getSelectedPageKey(props = this.props) {
    return last(props.childPages).key;
  }

  pageWillAppear() {
    super.pageWillAppear();
    if (this.getSelectedPage()) this.getSelectedPage().pageWillAppear();
  }

  pageDidAppear() {
    super.pageDidAppear();
    if (this.getSelectedPage()) this.getSelectedPage().pageDidAppear();
  }

  pageWillDisappear() {
    super.pageWillDisappear();
    if (this.getSelectedPage()) this.getSelectedPage().pageDidAppear();
  }

  pageDidDisappear() {
    super.pageDidDisappear();
    if (this.getSelectedPage()) this.getSelectedPage().pageDidDisappear();
  }

  presentModal(props) {
    this.props.dispatch(presentModal(this.props.path, props));
  }

  dismissModal(key) {
    this.props.dispatch(dismissModal(this.props.path, key));
  }
}