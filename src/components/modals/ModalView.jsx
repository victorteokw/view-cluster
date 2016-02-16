import React from 'react';
import classNames from 'classnames';

export default class ModalView extends React.Component {

  static propTypes = pureModalPropTypes;

  static defaultProps = modalDefaultProps;

  constructor(props, context) {
    super(props, context);
    this.state = {shown: false};
  }

  componentWillEnter(callback) {
    setTimeout(() => this.setState({shown: true}), 1);
    setTimeout(callback, 0.3 * 1000);
  }

  componentWillLeave(callback) {
    this.setState({shown: false});
    setTimeout(callback, 0.3 * 1000);
  }

  render() {
    return <div className={classNames('modal', this.state)}>
      {this.props.children}
    </div>
  }


}