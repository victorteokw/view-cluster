import React from 'react';
import Page from './Page';
import ModalsPage from './modals/ModalsPage';

import drop from 'lodash/drop';
import find from 'lodash/find';

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
    let rootPage = find(this.props.childPages, (c) => c.key === 'root');
    let modalsPage = find(this.props.childPages, (c) => c.key === 'modals');
    return <div className="view-cluster-page">
      {this.pageRender(rootPage)}
      {this.props.children}
      {this.pageRender(modalsPage)}
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
    let modalsPage = find(props.childPages, (c) => c.key === 'modals');
    if (modalsPage.props.childPages.length > 0) {
      return 'modals';
    } else {
      return 'root';
    }
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
    this.pages['modals'].presentModal(props);
  }

  dismissModal(key) {
    this.pages['modals'].dismissModal(key);
  }

  pureRender() {
    return false;
  }
}