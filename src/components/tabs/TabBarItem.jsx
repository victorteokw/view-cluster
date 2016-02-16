import React from 'react';
import TextButton from 'react-text-button';
import classNames from 'classnames';

export default class TabBarItem extends React.Component {

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