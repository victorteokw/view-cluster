import React from 'react';
import ReactTransitionGroup from './ReactTransitionGroup';
import Page from '../Page';
import NavigationBar from './NavigationBar';

export default class StackPage extends Page {

  static propTypes = {
    stack: React.PropTypes.arrayOf(

    )
  };

  render() {
    return <div className="stack-page">
      <NavigationBar ref="navigationBar" />
      <ReactTransitionGroup component="div" className="stack">
        {this.props.children}
      </ReactTransitionGroup>
    </div>
  }

}