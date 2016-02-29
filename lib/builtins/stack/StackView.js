'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StackView = function (_React$Component) {
  _inherits(StackView, _React$Component);

  function StackView(props, context) {
    _classCallCheck(this, StackView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StackView).call(this, props, context));

    _this.state = { out: !_this.props.first, beyondTabBar: false };
    return _this;
  }

  _createClass(StackView, [{
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      var _this2 = this;

      if (this.props.first) {
        callback();
      } else {
        setTimeout(function () {
          _this2.setState({ out: false });
        }, 1);
        setTimeout(callback, 0.3 * 1000);
      }
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      if (this.props.first) {
        callback();
      } else {
        this.setState({ out: true });
        setTimeout(callback, 0.3 * 1000);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var className = (0, _classnames2.default)("stack-view", {
        last: this.props.last,
        first: this.props.first,
        out: this.state.out,
        'under-nav-bar': this.props.hasNavBar,
        'beyond-tab-bar': this.state.beyondTabBar,
        'under-tab-bar': this.props.hasTabBar && !this.state.beyondTabBar
      });
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'div',
          { className: 'stack-item-page-container' },
          this.props.children
        ),
        _react2.default.createElement('div', { className: 'stack-item-shadow' })
      );
    }
  }]);

  return StackView;
}(_react2.default.Component);

StackView.propTypes = {
  first: _react2.default.PropTypes.bool,
  last: _react2.default.PropTypes.bool,
  hasNavBar: _react2.default.PropTypes.bool,
  hasTabBar: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.element.isRequired
};
exports.default = StackView;