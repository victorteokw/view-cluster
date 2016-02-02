import React from 'react';
import TextButton from 'react-text-button';
import classNames from 'classnames';
import {pureTabPropTypes} from './propTypes';
import assign from 'lodash/assign';

export default class TabBarItem extends React.Component {

  static propTypes = assign({}, pureTabPropTypes, {callback: React.PropTypes.func.isRequired});

  constructor(props, context) {
    super(props, context);
  }

  style(className, index) {
    return {};
  }

  render() {
    let itemClassName = classNames('item', {selected: this.props.selected});
    return <TextButton component="div" className={itemClassName} touchUpInside={this.props.callback}>
      <img className="icon" src={this.props.selected ? this.props.highlightIcon : this.props.icon} />
      <div className="title">{this.props.title}</div>
    </TextButton>
  }
}