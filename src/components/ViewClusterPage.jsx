import React from 'react';
import Page from './Page';
import ModalsPage from './modals/ModalsPage';

import drop from 'lodash/drop';

export default class ViewClusterPage extends Page {

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
    return <div className="view-cluster-page">
      {this.pageRender(this.props.childPages[0])}
      {this.props.children}
      {this.pageRender({
        key: 'view-cluster-modal-page',
        page: 'ModalsPage',
        props: {
          childPages: drop(this.props.childPages)
        }
      })}
    </div>
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
    if (props.childPages.length === 1) {
      return props.childPages[0].key;
    } else if (props.childPages.length > 1) {
      return 'view-cluster-modal-page';
    } else return undefined;
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
    this.pages['view-cluster-modal-page'].presentModal(props);
  }

  dismissModal(key) {
    this.pages['view-cluster-modal-page'].dismissModal(key);
  }

  pureRender() {
    return false;
  }
}