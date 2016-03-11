import React from 'react';
import TextButton from 'react-text-button';
import classNames from 'classnames';

export default class TabBarItem extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool.isRequired,
    icon: React.PropTypes.string.isRequired,
    selectedIcon: React.PropTypes.string.isRequired,
    badge: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    callback: React.PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let itemClassName = classNames('item', {selected: this.props.selected});
    return <TextButton component="div" className={itemClassName} touchUpInside={this.props.callback}>
      <img className="icon" src={this.props.selected ? this.props.selectedIcon : this.props.icon} />
      <div className="title">{this.props.title}</div>
      {this.props.badge ? <div className="badge">{this.props.badge}</div> : null}
    </TextButton>
  }
}