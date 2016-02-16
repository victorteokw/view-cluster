import React from 'react';
import ReactTransitionGroup from './ReactTransitionGroup';
import Page from '../Page';
import NavigationBar from './NavigationBar';

export default class StackPage extends Page {

  static propTypes = {
    stack: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
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
    return <div className="stack-page">
      <NavigationBar ref="navigationBar" />
      <ReactTransitionGroup component="div" className="stack">
        {this.props.children}
      </ReactTransitionGroup>
    </div>
  }

}