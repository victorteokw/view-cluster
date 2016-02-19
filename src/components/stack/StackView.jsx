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
    let className = classNames("stack-view", {
      last: this.props.last,
      first: this.props.first
    });
    return <div className={className}>
      <div className="stack-item-page-container">
        {this.props.children}
      </div>
      <div className="stack-item-shadow"></div>
    </div>
  }

}