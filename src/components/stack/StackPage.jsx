import React from 'react';
import ReactTransitionGroup from '../ReactTransitionGroup';
import Page from '../Page';
import StackView from './StackView';
import NavigationBar from './NavigationBar';

import last from 'lodash/last';
import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';

Page.prototype.navigationItem = function() {
  return {};
};

Page.prototype.pushStack = function(desc) {
  if (this.superPage) {
    this.superPage.pushStack(desc);
  }
};

Page.prototype.popStack = function() {
  if (this.superPage) {
    this.superPage.popStack();
  }
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
    return last(props.childPages).key;
  }

  componentDidMount() {
    super.componentDidMount();
    this.update();
  }

  componentWillUpdate(nextProps, nextState) {
    super.componentWillUpdate(nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    let currentSelectedKey = this.getSelectedPageKey();
    let previousSelectedKey = this.getSelectedPageKey(prevProps);
    if (currentSelectedKey !== previousSelectedKey) {
      this.getSelectedPage().pageWillAppear();
      if (this.pages[previousSelectedKey]) {
        this.pages[previousSelectedKey].pageWillDisappear();
      }
    }
    this.update();
  }

  update() {
    this.updateNavigationBar();
    this.updateTabBar();
  }

  shouldComponentUpdate() {
    return true;
  }

  updateNavigationBar() {
    let keyArray = map(this.props.childPages, (i) => i.key);
    let pageArray = map(keyArray, (k) => this.pages[k]);
    let itemsArray = map(pageArray, (p) => p.navigationItem());
    this.refs.navigationBar.setState({stack: itemsArray});
  }

  updateTabBar() {
    let keyArray = map(this.props.childPages, (i) => i.key);
    let pageArray = map(keyArray, (k) => this.pages[k]);
    let hideTabBar = find(pageArray, (p) => p.beyondTabBar());
    if (hideTabBar) {
      this.hideTabBar();
    } else {
      this.showTabBar();
    }
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

  pushStack(desc) {
    let newChildPageProps = cloneDeep(this.props.childPages);
    newChildPageProps.push(desc);
    this.setPageProps({childPages: newChildPageProps});
  }

  popStack() {
    let newChildPageProps = cloneDeep(this.props.childPages);
    newChildPageProps.pop();
    this.setPageProps({childPages: newChildPageProps});
  }
}