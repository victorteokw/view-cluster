import React from 'react';
import Page from './../Page';
import TabBar from './TabBar';
import TabView from './TabView';
import TabBarItem from './TabBarItem';

import omit from 'lodash/omit';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';

import addPageAction from '../../addPageAction';

import {SELECT_TAB} from './action/types';
import {selectTab} from './action/creators';

addPageAction(SELECT_TAB, function(props, action) {
  each(props.childPages, function(c) {
    c.selected = c.key === action.payload.key;
  });
  return props;
});

Page.prototype.beyondTabBar = function() {
  return false;
};

Page.prototype.selectTab = function(key) {
  if (this.superPage) {
    this.superPage.selectTab(key);
  }
};

Page.prototype.showTabBar = function() {
  if (this.superPage) {
    this.superPage.showTabBar();
  }
};

Page.prototype.hideTabBar = function() {
  if (this.superPage) {
    this.superPage.hideTabBar();
  }
};

export default class TabsPage extends Page {

  static propTypes = {
    childPages: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        selected: React.PropTypes.bool.isRequired,
        icon: React.PropTypes.string.isRequired,
        selectedIcon: React.PropTypes.string.isRequired,
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
    return <div className="tabs-page">
      {
        this.props.childPages.map((t) => {
          return <TabView key={t.key} selected={t.selected}>
            {this.pageRender(t)}
          </TabView>
        })
      }
      <TabBar ref="tabBar">
        {
          this.props.childPages.map((t) => {
            return <TabBarItem {...omit(t, 'page', 'props')} callback={this.selectTab.bind(this, t.key)} />
          })
        }
      </TabBar>
    </div>
  }

  getSelectedPage() {
    return this.unwrapPage(this.pages[this.getSelectedPageKey()]);
  }

  getSelectedPageKey(props = this.props) {
    return find(props.childPages, (t) => t.selected === true).key;
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

  selectTab(key) {
    this.props.dispatch(selectTab(this.props.path, key));
  }

  showTabBar() {
    this.refs.tabBar.setState({hide: false});
  }

  hideTabBar() {
    this.refs.tabBar.setState({hide: true});
  }

  pureRender() {
    return false;
  }
}