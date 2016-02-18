'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactTransitionGroup = require('../ReactTransitionGroup');

var _ReactTransitionGroup2 = _interopRequireDefault(_ReactTransitionGroup);

var _Page2 = require('../Page');

var _Page3 = _interopRequireDefault(_Page2);

var _ModalView = require('./ModalView');

var _ModalView2 = _interopRequireDefault(_ModalView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalsPage = function (_Page) {
  _inherits(ModalsPage, _Page);

  function ModalsPage(props, context) {
    _classCallCheck(this, ModalsPage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ModalsPage).call(this, props, context));

    _this.noLazyLoading();
    return _this;
  }

  _createClass(ModalsPage, [{
    key: 'renderPage',
    value: function renderPage() {
      var _this2 = this;

      return _react2.default.createElement(
        _ReactTransitionGroup2.default,
        { component: 'div', className: 'modals' },
        this.props.childPages.map(function (m) {
          return _react2.default.createElement(
            _ModalView2.default,
            { key: m.key },
            _this2.pageRender(m)
          );
        })
      );
    }
  }]);

  return ModalsPage;
}(_Page3.default);

ModalsPage.propTypes = {
  childPages: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    key: _react2.default.PropTypes.string.isRequired,
    page: _react2.default.PropTypes.string.isRequired,
    props: _react2.default.PropTypes.object
  }))
};