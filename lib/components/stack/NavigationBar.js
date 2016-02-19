'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTextButton = require('react-text-button');

var _reactTextButton2 = _interopRequireDefault(_reactTextButton);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _last = require('lodash/last');

var _last2 = _interopRequireDefault(_last);

var _dropRight = require('lodash/dropRight');

var _dropRight2 = _interopRequireDefault(_dropRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var navItemContentPropTypes = {
  content: _react2.default.PropTypes.oneOfType(_react2.default.PropTypes.string, _react2.default.PropTypes.element),
  event: _react2.default.PropTypes.func,
  badge: _react2.default.PropTypes.oneOfType(_react2.default.PropTypes.string, _react2.default.PropTypes.number)
};

var _uniq = 0;
var uniq = function uniq() {
  return 'must be unique ' + _uniq++;
};

var empty = function empty() {};

var purifyItem = function purifyItem(item) {
  return item.identifier;
};

var NavigationBar = function (_React$Component) {
  _inherits(NavigationBar, _React$Component);

  function NavigationBar(props, context) {
    _classCallCheck(this, NavigationBar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NavigationBar).call(this, props, context));

    _this.state = (0, _assign2.default)({ stack: [] }, _this.props);
    return _this;
  }

  _createClass(NavigationBar, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var pureNextStack = nextState.stack.map(purifyItem);
      var pureStack = this.state.stack.map(purifyItem);
      this.dominantStackItem = (0, _last2.default)(nextState.stack);
      if ((0, _isEqual2.default)(pureStack, (0, _dropRight2.default)(pureNextStack)) && !(0, _isEqual2.default)(pureStack, [])) {
        this.animate = 'push';
        this.topStackItem = this.dominantStackItem;
        this.bottomStackItem = (0, _last2.default)(this.state.stack);
      } else if ((0, _isEqual2.default)((0, _dropRight2.default)(pureStack), pureNextStack)) {
        this.animate = 'pop';
        this.bottomStackItem = this.dominantStackItem;
        this.topStackItem = (0, _last2.default)(this.state.stack);
      } else {
        this.animate = false;
        this.topStackItem = this.dominantStackItem;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.animate) {
        this.animate = false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var className = (0, _classnames2.default)('navigation-bar', {
        animate: this.animate
      }, this.animate, this.dominantStackItem ? this.dominantStackItem.variant : false);
      return _react2.default.createElement(
        'div',
        { className: className },
        this.renderStackItem('top', this.topStackItem),
        this.renderStackItem('bottom', this.bottomStackItem)
      );
    }
  }, {
    key: 'renderStackItem',
    value: function renderStackItem(className, item) {
      if (!item) return null;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('item', className) },
        item.left ? this.renderItemPartial(item.left, 'left') : null,
        item.title ? this.renderItemPartial(item.title, 'title') : null,
        item.right ? this.renderItemPartial(item.right, 'right') : null
      );
    }
  }, {
    key: 'renderItemPartial',
    value: function renderItemPartial(partial, className) {
      return _react2.default.createElement(
        _reactTextButton2.default,
        { key: uniq(), className: className, touchUpInside: partial.event || empty },
        partial.content,
        partial.badge ? _react2.default.createElement(
          'div',
          { className: 'badge' },
          partial.badge
        ) : null
      );
    }
  }]);

  return NavigationBar;
}(_react2.default.Component);

NavigationBar.propTypes = {
  stack: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    variant: _react2.default.PropTypes.string,
    left: _react2.default.PropTypes.shape(navItemContentPropTypes),
    title: _react2.default.PropTypes.shape(navItemContentPropTypes),
    right: _react2.default.PropTypes.shape(navItemContentPropTypes),
    identifier: _react2.default.PropTypes.string.isRequired
  }))
};
exports.default = NavigationBar;