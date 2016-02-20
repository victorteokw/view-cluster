import React from 'react';
import classNames from 'classnames';

export default class TabBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {hide: false};
  }

  render() {
    return <div className={classNames('tab-bar', {hide: this.state.hide})}>
      <div className="tab-items">
        {this.props.children}
      </div>
      <div className="shadow"></div>
    </div>
  }
}