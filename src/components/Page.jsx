import React from 'react';

let EMPTY = 'EMPTY';
let LOADING = 'LOADING';
let LOADED = 'LOADED';

export default class Page extends React.Component {

  static propTypes = {
    pages: React.PropTypes.objectOf(
      React.PropTypes.any
    ),
    path: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired
    )
  };

  static defaultProps = {
    pages: {},
    path: []
  };

  constructor(props, context) {
    super(props, context);
    this.state = {status: EMPTY};
    this.pages = {};
  }

  noLazyLoading() {
    this.state = {status: LOADED};
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

  pageRender(descriptor, key) {
    let Page = this.props.pages[descriptor.page];
    let props = descriptor.props;
    let path = concat(this.props.path, key);
    return <Page path={path} {...props} ref={(r) => this.pages[key] = r} />
  }

  getPageForKey() {
    return this.pages[key];
  }

  getPageDescriptorForKey() {
    return undefined;
  }
}