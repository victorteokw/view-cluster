import React from 'react';

import {viewClusterPropTypes, viewClusterDefaultProps} from './propTypes';

import omit from 'lodash/omit';

import TabBar from './TabBar';
import TabBarItem from './TabBarItem';
import TabContent from './TabContent';
import NavigationBar from './NavigationBar';
import Modals from './Modals';
import Modal from './Modal';
import Stack from './Stack';
import StackItem from './StackItem';

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
      return <div>
        {
          props.tabs.map((t) => {
            return <TabContent {...omit(t, ['stack', 'page'])}>
              {this.renderBody(t)}
            </TabContent>
          })
        }
      </div>
    } else if (props.stack) {
      return <Stack>
        {
          props.stack.map((i, n, s) => {
            return <StackItem key={i.key} first={n === 0} last={n === s.length - 1}>
              {this.renderBody(i)}
            </StackItem>
          })
        }
      </Stack>
    } else if (props.page) {
      let Page = this.props.pages[props.page];
      return <Page {props.props} />
    }
  }

  renderModal(props) {
    if (!props.modals) return null;
    return <Modals>
      {
        props.modals.map((m) => {
          return <Modal key={m.key}>
            {this.renderBody(m)}
            {this.renderNavigationBar(m)}
            {this.renderTabBar(m)}
          </Modal>
        })
      }
    </Modals>
  }

  renderNavigationBar(props) {
    if (!props.stack || !props.tabs) return null;
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