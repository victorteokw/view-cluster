import React from 'react';
import TextButton from 'react-text-button';
import classNames from 'classnames';

export default class TabBarItem extends React.Component {

  static propTypes = {
    tabs: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        selected: React.PropTypes.bool.isRequired,
        icon: React.PropTypes.string.isRequired,
        selectedIcon: React.PropTypes.string.isRequired
      })
    )
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let itemClassName = classNames('item', {selected: this.props.selected});
    return <TextButton component="div" className={itemClassName} touchUpInside={this.props.callback}>
      <img className="icon" src={this.props.selected ? this.props.highlightIcon : this.props.icon} />
      <div className="title">{this.props.title}</div>
    </TextButton>
  }
}