import React from 'react';
import Page from './../Page';
import TabBar from './TabBar';
import TabView from './TabView';
import TabBarItem from './TabBarItem.jsx';

export default class TabsPage extends Page {

  static propTypes = {
    tabs: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        selected: React.PropTypes.bool.isRequired,
        icon: React.PropTypes.string.isRequired,
        selectedIcon: React.PropTypes.string.isRequired,
        page: React.PropTypes.shape({
          page: React.PropTypes.string.isRequired,
          props: React.PropTypes.object
        })
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
        this.props.tabs.map((t) => {
          return <TabView key={t.key} selected={t.selected}>
            {this.pageRender(t.page, t.key)}
          </TabView>
        })
      }
      <TabBar>
        {
          this.props.tabs.map((t) => {
            return <TabBarItem key={t.key} selected={t.selected}>

            </TabBarItem>
          })
        }
      </TabBar>
    </div>
  }



}