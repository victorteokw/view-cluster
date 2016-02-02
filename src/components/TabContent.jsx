import React from 'react';
import classNames from 'classnames';

export default class TabContent extends React.Component {

  static propTypes = {
    selected: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element.isRequired
  };

  static defaultProps = {
    show: false
  };

  render() {
    return <div className={classNames('tab-content', {selected: this.props.selected})}>
      {this.props.children}
    </div>
  }
}
