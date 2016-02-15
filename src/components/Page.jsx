import React from 'react';

let EMPTY = 'EMPTY';
let LOADING = 'LOADING';
let LOADED = 'LOADED';

export default class Page extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {status: EMPTY};
  }

  loadPage(callback) {
    callback();
  }

  unloadPage(callback) {
    callback();
  }

  lazyUnloadPage() {
    this.pageWillUnload();
    this.setState({status: EMPTY});
    this.unloadPage(() => {
      this.pageDidUnload();
    });
  }

  lazyLoadPage() {
    this.pageWillLoad();
    this.setState({status: LOADING});
    this.loadPage(() => {
      this.setState({status: LOADED});
      this.pageDidLoad();
    });
  }

  tryLazyLoadPage() {
    if (this.state.status === EMPTY) {
      this.lazyLoadPage();
    }
  }

  tryLazyUnloadPage() {
    if (this.state.status === LOADING || this.state.status === EMPTY) {
      this.lazyUnloadPage();
    }
  }

  pageWillLoad() {}

  pageDidLoad() {}

  pageWillUnload() {}

  pageDidUnload() {}

  pageWillAppear() {
    this.tryLazyLoadPage();
  }

  pageDidAppear() {}

  pageWillDisappear() {}

  pageDidDisappear() {}

  renderLoading() {
    return null;
  }

  renderPage() {
    return null;
  }

  render() {
    if (this.state.status === LOADED) {
      return this.renderPage();
    } else if (this.state.status === LOADING) {
      return this.renderLoading();
    } else {
      return null;
    }
  }

  // Added by container components
  navigationItem() {
    return {};
  }

  beyondTabBar() {
    return false;
  }
}