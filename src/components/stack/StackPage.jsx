import React from 'react';
import ReactTransitionGroup from '../ReactTransitionGroup';
import Page from '../Page';
import StackView from './StackView';
import NavigationBar from './NavigationBar';

import last from 'lodash/last';

Page.prototype.navigationItem = function() {
  return {};
};

export default class StackPage extends Page {

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
    return <div className="stack-page">
      <NavigationBar ref="navigationBar" />
      <ReactTransitionGroup component="div" className="stack">
        {
          this.props.childPages.map((i, n, a) => {
            return <StackView key={i.key} first={n === 0} last={n === a.length - 1}>
              {this.pageRender(i)}
            </StackView>
          })
        }
      </ReactTransitionGroup>
    </div>
  }

  getSelectedPage() {
    return this.unwrapPage(this.pages[this.getSelectedPageKey()]);
  }

  getSelectedPageKey(props = this.props) {
    return last(this.props.childPages).key;
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUpdate(nextProps, nextState) {
    super.componentWillUpdate(nextProps, nextState);
    let currentSelectedKey = this.getSelectedPageKey();
    let nextSelectedKey = this.getSelectedPageKey(nextProps);
    if (nextSelectedKey !== currentSelectedKey) {
      this.getSelectedPage().pageWillDisappear();
      if (this.pages[nextSelectedKey]) {
        this.pages[nextSelectedKey].pageWillAppear();
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    let currentSelectedKey = this.getSelectedPageKey();
    let previousSelectedKey = this.getSelectedPageKey(prevProps);
    if (currentSelectedKey !== previousSelectedKey) {
      this.getSelectedPage().pageDidAppear();
      if (this.pages[previousSelectedKey]) {
        this.pages[previousSelectedKey].pageDidDisappear();
      }
    }
    this.updateNavigationBar();
  }

  updateNavigationBar() {
    let keyArray = map(this.props.childPages, (i) => i.key);
    let pageArray = map(keyArray, (k) => this.pages[k]);
    let itemsArray = map(pageArray, (p) => p.navigationItem());
    this.refs.navigationBar.setState({stack: itemsArray});
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  pageWillAppear() {
    super.pageWillAppear();
    this.getSelectedPage().pageWillAppear();
  }

  pageDidAppear() {
    super.pageDidAppear();
    this.getSelectedPage().pageDidAppear();
  }

  pageWillDisappear() {
    super.pageWillDisappear();
    this.getSelectedPage().pageDidAppear();
  }

  pageDidDisappear() {
    super.pageDidDisappear();
    this.getSelectedPage().pageDidDisappear();
  }
}