import React from 'react';
import ReactTransitionGroup from '../ReactTransitionGroup';
import Page from '../Page';

class ModalsPage extends Page {

  static propTypes = {

  };

  renderPage() {
    return <ReactTransitionGroup component="div" className="modals">
      {this.props.children}
    </ReactTransitionGroup>
  }
}