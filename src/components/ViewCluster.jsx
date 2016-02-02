import React from 'react';

import {viewClusterPropTypes, viewClusterDefaultProps} from './propTypes';

import omit from 'lodash/omit';

import TabBar from './TabBar';
import TabBarItem from './TabBarItem';
import NavigationBar from './NavigationBar';
import Modals from './Modals';

export default class ViewCluster extends React.Component {

  static propTypes = viewClusterPropTypes;

  static defaultProps = viewClusterDefaultProps;

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <div className="view-cluster">
      {this.renderBody(this.props)}
      {this.renderNavigationBar(this.props)}
      {this.renderTabBar(this.props)}
      {this.renderModal(this.props)}
    </div>
  }

  renderBody(props) {
    if (props.tabs) {

    } else if (props.stack) {

    } else if (props.page) {

    }
  }

  renderModal(props) {
    if (!props.modals) return null;
    return <Modals>
      {
        props.modals.map((m) => {
          return <Modal key={m.key}>
            
          </Modal>
        })
      }
    </Modals>
  }

  renderNavigationBar(props) {
    if (!props.stack) return null;
    return <NavigationBar ref='navigationBar' />
  }

  renderTabBar(props) {
    if (!props.tabs) return null;
    return <TabBar ref="tabBar">
      {
        props.tabs.map((t) => {
          return <TabBarItem {...omit(t, ['stack', 'page'])} />
        })
      }
    </TabBar>
  }
}