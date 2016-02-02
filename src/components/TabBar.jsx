import React from 'react';
import classNames from 'classnames';

export default class TabBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      hide: false
    };
  }

  style(className, index) {
    return {};
  }

  render() {
    let tabBarClassName = classNames('tab-bar', this.state);
    return <div className={tabBarClassName} style={this.style(tabBarClassName)}>
      <div className="tabs" style={this.style('tabs')}>
        {this.props.children}
      </div>
      <div className="shadow" style={this.style('shadow')}></div>
    </div>
  }
}