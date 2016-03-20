import React from 'react';
import classNames from 'classnames';

export default class ModalView extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired
  };

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

  componentWillAppear(callback) {
    this.setState({shown: true});
    callback();
  }

  render() {
    return <div className={classNames('modal', this.state)}>
      <div className="modal-shadow"></div>
      <div className="modal-page-container">
        {this.props.children}
      </div>
    </div>
  }


}