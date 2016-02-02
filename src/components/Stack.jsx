import React from 'react';
import ReactTransitionGroup from './ReactTransitionGroup';

export default class Stack extends React.Component {

  render() {
    return <ReactTransitionGroup component="div" className="stack">
      {this.props.children}
    </ReactTransitionGroup>
  }

}