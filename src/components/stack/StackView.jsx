import React from 'react';
import classNames from 'classnames';

export default class StackView extends React.Component {

  static propTypes = {
    first: React.PropTypes.bool,
    last: React.PropTypes.bool,
    children: React.PropTypes.element.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillEnter(callback) {
    if (this.props.first) {
      callback();
    } else {
      setTimeout(() => {
        this.setState({shown: true});
      }, 1);
      setTimeout(callback, 0.3 * 1000);
    }
  }

  componentWillLeave(callback) {
    if (this.props.first) {
      callback();
    } else {
      this.setState({shown: false});
      setTimeout(callback, 0.3 * 1000);
    }
  }

  render() {
    let shadowClass = classNames('stack-item-shadow', {
      on: this.props.last
    });
    return <div className="stack-view">
      <div className="stack-item-page-container">
        {this.props.children}
      </div>
      <div className={shadowClass}></div>
    </div>
  }

}