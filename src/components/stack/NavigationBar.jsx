import React from 'react';
import TextButton from 'react-text-button';
import classNames from 'classnames';
import assign from 'lodash/assign';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import dropRight from 'lodash/dropRight';

let navItemContentPropTypes = {
  content: React.PropTypes.oneOfType(
    React.PropTypes.string,
    React.PropTypes.element
  ),
  event: React.PropTypes.func,
  badge: React.PropTypes.oneOfType(
    React.PropTypes.string,
    React.PropTypes.number
  )
};

let _uniq = 0;
let uniq = function() {
  return 'must be unique '+ _uniq++;
};

let empty = function() {};

let purifyItem = function(item) {
  return item.identifier;
};

export default class NavigationBar extends React.Component {

  static propTypes = {
    stack: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        variant: React.PropTypes.string,
        left: React.PropTypes.shape(navItemContentPropTypes),
        title: React.PropTypes.shape(navItemContentPropTypes),
        right: React.PropTypes.shape(navItemContentPropTypes),
        identifier: React.PropTypes.string.isRequired
      })
    )
  };

  constructor(props, context) {
    super(props, context);
    this.state = assign({stack: []}, this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state);
  }

  componentWillUpdate(nextProps, nextState) {
    let pureNextStack = nextState.stack.map(purifyItem);
    let pureStack = this.state.stack.map(purifyItem);
    this.dominantStackItem = last(nextState.stack);
    if (isEqual(pureStack, dropRight(pureNextStack)) && !isEqual(pureStack, [])) {
      this.animate = 'push';
      this.topStackItem = this.dominantStackItem;
      this.bottomStackItem = last(this.state.stack);
    } else if (isEqual(dropRight(pureStack), pureNextStack)) {
      this.animate = 'pop';
      this.bottomStackItem = this.dominantStackItem;
      this.topStackItem = last(this.state.stack);
    } else {
      this.animate = false;
      this.topStackItem = this.dominantStackItem;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.animate) {
      this.animate = false;
    }
  }

  render() {
    let className = classNames('navigation-bar', {
      animate: this.animate
    }, this.animate, this.dominantStackItem ? this.dominantStackItem.variant : false);
    return <div className={className}>
      {this.renderStackItem('top', this.topStackItem)}
      {this.renderStackItem('bottom', this.bottomStackItem)}
    </div>
  }

  renderStackItem(className, item) {
    if (!item) return null;
    return <div className={classNames('item', className)}>
      {item.left ? this.renderItemPartial(item.left, 'left') : null}
      {item.title ? this.renderItemPartial(item.title, 'title') : null}
      {item.right ? this.renderItemPartial(item.right, 'right') : null}
    </div>
  }

  renderItemPartial(partial, className) {
    return <TextButton key={uniq()} className={className} touchUpInside={partial.event || empty}>
      {partial.content}
      {partial.badge ? <div className="badge">{partial.badge}</div> : null}
    </TextButton>
  }
}