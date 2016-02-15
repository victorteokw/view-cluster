import React from 'react';

export default class StackItem extends React.Component {

  static propTypes = {
    first: React.PropTypes.bool,
    last: React.PropTypes.bool
  };

  static defaultProps = {

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
    return <div className="stack-item">
      {this.props.children}
    </div>
  }

}