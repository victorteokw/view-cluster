import React from 'react';
import classNames from 'classnames';

export default class TabBar extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <div className={classNames('tab-bar')}>
      <div className="tab-items">
        {this.props.children}
      </div>
      <div className="shadow"></div>
    </div>
  }
}