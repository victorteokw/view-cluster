import React from 'react';
import classNames from 'classnames';

export default class TabView extends React.Component {

  static propTypes = {
    selected: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element.isRequired
  };

  render() {
    return <div className={classNames('tab-view', {selected: this.props.selected})}>
      {this.props.children}
    </div>
  }
}
