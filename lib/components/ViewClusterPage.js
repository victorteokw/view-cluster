'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Page2 = require('./Page');

var _Page3 = _interopRequireDefault(_Page2);

var _ModalsPage = require('./modals/ModalsPage');

var _ModalsPage2 = _interopRequireDefault(_ModalsPage);

var _drop = require('lodash/drop');

var _drop2 = _interopRequireDefault(_drop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewClusterPage = function (_Page) {
  _inherits(ViewClusterPage, _Page);

  function ViewClusterPage(props, context) {
    _classCallCheck(this, ViewClusterPage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ViewClusterPage).call(this, props, context));

    _this.noLazyLoading();
    return _this;
  }

  _createClass(ViewClusterPage, [{
    key: 'renderPage',
    value: function renderPage() {
      return _react2.default.createElement(
        'div',
        { className: 'view-cluster-page' },
        this.pageRender(this.props.childPages[0]),
        this.props.children,
        this.pageRender({
          key: 'view-cluster-modal-page',
          page: 'ModalsPage',
          props: {
            childPages: (0, _drop2.default)(this.props.childPages)
          }
        })
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      _get(Object.getPrototypeOf(ViewClusterPage.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState);
      var currentSelectedKey = this.getSelectedPageKey();
      var previousSelectedKey = this.getSelectedPageKey(prevProps);
      if (currentSelectedKey !== previousSelectedKey) {
        if (this.getSelectedPage()) {
          this.getSelectedPage().pageWillAppear();
        }
        if (this.pages[previousSelectedKey]) {
          this.pages[previousSelectedKey].pageWillDisappear();
        }
      }
    }
  }, {
    key: 'getSelectedPage',
    value: function getSelectedPage() {
      return this.unwrapPage(this.pages[this.getSelectedPageKey()]);
    }
  }, {
    key: 'getSelectedPageKey',
    value: function getSelectedPageKey() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

      if (props.childPages.length === 1) {
        return props.childPages[0].key;
      } else if (props.childPages.length > 1) {
        return 'view-cluster-modal-page';
      } else return undefined;
    }
  }, {
    key: 'pageWillAppear',
    value: function pageWillAppear() {
      _get(Object.getPrototypeOf(ViewClusterPage.prototype), 'pageWillAppear', this).call(this);
      if (this.getSelectedPage()) this.getSelectedPage().pageWillAppear();
    }
  }, {
    key: 'pageDidAppear',
    value: function pageDidAppear() {
      _get(Object.getPrototypeOf(ViewClusterPage.prototype), 'pageDidAppear', this).call(this);
      if (this.getSelectedPage()) this.getSelectedPage().pageDidAppear();
    }
  }, {
    key: 'pageWillDisappear',
    value: function pageWillDisappear() {
      _get(Object.getPrototypeOf(ViewClusterPage.prototype), 'pageWillDisappear', this).call(this);
      if (this.getSelectedPage()) this.getSelectedPage().pageDidAppear();
    }
  }, {
    key: 'pageDidDisappear',
    value: function pageDidDisappear() {
      _get(Object.getPrototypeOf(ViewClusterPage.prototype), 'pageDidDisappear', this).call(this);
      if (this.getSelectedPage()) this.getSelectedPage().pageDidDisappear();
    }
  }, {
    key: 'presentModal',
    value: function presentModal(props) {
      this.pages['view-cluster-modal-page'].presentModal(props);
    }
  }, {
    key: 'dismissModal',
    value: function dismissModal(key) {
      this.pages['view-cluster-modal-page'].dismissModal(key);
    }
  }, {
    key: 'pureRender',
    value: function pureRender() {
      return false;
    }
  }]);

  return ViewClusterPage;
}(_Page3.default);

ViewClusterPage.propTypes = {
  childPages: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    key: _react2.default.PropTypes.string.isRequired,
    page: _react2.default.PropTypes.string.isRequired,
    props: _react2.default.PropTypes.object
  }))
};
exports.default = ViewClusterPage;