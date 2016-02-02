import React from 'react';
import ReactTransitionGroup from './ReactTransitionGroup';

export default class Modals extends React.Component {
  render() {
    return <ReactTransitionGroup component="div" className="modals">
      {this.props.children}
    </ReactTransitionGroup>
  }
}