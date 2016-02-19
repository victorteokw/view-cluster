import React from 'react';

import concat from 'lodash/concat';
import isEqual from 'lodash/isEqual';

let EMPTY = 'EMPTY';
let LOADING = 'LOADING';
let LOADED = 'LOADED';

import {setPageProps, replacePageProps} from '../action/creators';

export default class Page extends React.Component {

  static propTypes = {
    pages: React.PropTypes.objectOf(
      React.PropTypes.any
    ),
    path: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired
    ),
    childPages: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        page: React.PropTypes.string.isRequired,
        props: React.PropTypes.object
      })
    ),
    dispatch: React.PropTypes.func,
    root: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    pages: {},
    path: [],
    childPages: [],
    root: false
  };

  constructor(props, context) {
    super(props, context);
    this.state = {status: EMPTY};
    this.pages = {};
  }

  componentDidMount() {
    if (this.props.root) {
      this.pageWillAppear();
    }
  }

  componentWillUnmount() {
    if (this.props.root) {
      this.pageWillDisappear();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.pureRender() && isEqual(this.props, nextProps) && isEqual(this.state, nextState));
  }

  componentWillUpdate(_, __) {}

  componentDidUpdate(_, __) {}

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

  pageRender(descriptor) {
    let Page = this.props.pages[descriptor.page];
    let props = descriptor.props;
    let path = concat(this.props.path, descriptor.key);
    return <Page path={path} pages={this.props.pages} dispatch={this.props.dispatch} {...props} ref={(r) => {
      r = this.unwrapPage(r);
      this.pages[descriptor.key] = r;
      if (r) {
        r.superPage = this;
      }
     }} />
  }

  getPageForKey() {
    return this.pages[key];
  }

  unwrapPage(page) {
    if (!page) return null;
    if (page.getWrappedInstance) {
      return page.getWrappedInstance();
    } else {
      return page;
    }
  }

  pureRender() {
    return false;
  }

  setPageProps(newProps) {
    this.props.dispatch(setPageProps(this.props.path, newProps));
  }

  replacePageProps(newProps) {
    this.props.dispatch(replacePageProps(this.props.path, newProps));
  }
}