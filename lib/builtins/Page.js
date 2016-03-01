'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _concat = require('lodash/concat');

var _concat2 = _interopRequireDefault(_concat);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _creators = require('../action/creators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EMPTY = 'EMPTY';
var LOADING = 'LOADING';
var LOADED = 'LOADED';
var ERROR = 'ERROR';

var Page = function (_React$Component) {
  _inherits(Page, _React$Component);

  function Page(props, context) {
    _classCallCheck(this, Page);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Page).call(this, props, context));

    _this.state = { status: EMPTY };
    _this.pages = {};
    return _this;
  }

  _createClass(Page, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.root) {
        this.pageWillAppear();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.root) {
        this.pageWillDisappear();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(this.pureRender() && (0, _isEqual2.default)(this.props, nextProps) && (0, _isEqual2.default)(this.state, nextState));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(_, __) {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_, __) {}
  }, {
    key: 'noLazyLoading',
    value: function noLazyLoading() {
      this.state = { status: LOADED };
    }
  }, {
    key: 'loadPage',
    value: function loadPage(callback, errorCallback) {
      callback();
    }
  }, {
    key: 'unloadPage',
    value: function unloadPage(callback) {
      callback();
    }
  }, {
    key: 'lazyUnloadPage',
    value: function lazyUnloadPage() {
      var _this2 = this;

      this.pageWillUnload();
      this.setState({ status: EMPTY });
      this.unloadPage(function () {
        _this2.pageDidUnload();
      });
    }
  }, {
    key: 'lazyLoadPage',
    value: function lazyLoadPage() {
      var _this3 = this;

      this.pageWillLoad();
      this.setState({ status: LOADING });
      this.loadPage(function () {
        _this3.setState({ status: LOADED });
        _this3.pageDidLoad();
      }, function () {
        _this3.setState({ status: ERROR });
        _this3.pageDidLoad();
      });
    }
  }, {
    key: 'tryLazyLoadPage',
    value: function tryLazyLoadPage() {
      if (this.state.status === EMPTY) {
        this.lazyLoadPage();
      }
    }
  }, {
    key: 'tryLazyUnloadPage',
    value: function tryLazyUnloadPage() {
      if (this.state.status === LOADING || this.state.status === EMPTY) {
        this.lazyUnloadPage();
      }
    }
  }, {
    key: 'pageWillLoad',
    value: function pageWillLoad() {}
  }, {
    key: 'pageDidLoad',
    value: function pageDidLoad() {}
  }, {
    key: 'pageWillUnload',
    value: function pageWillUnload() {}
  }, {
    key: 'pageDidUnload',
    value: function pageDidUnload() {}
  }, {
    key: 'pageWillAppear',
    value: function pageWillAppear() {
      this.tryLazyLoadPage();
    }
  }, {
    key: 'pageDidAppear',
    value: function pageDidAppear() {}
  }, {
    key: 'pageWillDisappear',
    value: function pageWillDisappear() {}
  }, {
    key: 'pageDidDisappear',
    value: function pageDidDisappear() {}
  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      return null;
    }
  }, {
    key: 'renderPage',
    value: function renderPage() {
      return null;
    }
  }, {
    key: 'renderError',
    value: function renderError() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.status === LOADED) {
        return this.renderPage();
      } else if (this.state.status === LOADING) {
        return this.renderLoading();
      } else if (this.state.status === ERROR) {
        return this.renderError();
      } else {
        return null;
      }
    }
  }, {
    key: 'pageRender',
    value: function pageRender(descriptor) {
      var _this4 = this;

      var Page = this.props.pages[descriptor.page];
      var props = descriptor.props;
      var path = (0, _concat2.default)(this.props.path, descriptor.key);
      return _react2.default.createElement(Page, _extends({ path: path, pages: this.props.pages, dispatch: this.props.dispatch }, props, { ref: function ref(r) {
          r = _this4.unwrapPage(r);
          _this4.pages[descriptor.key] = r;
          if (r) {
            r.superPage = _this4;
          }
        } }));
    }
  }, {
    key: 'getPageForKey',
    value: function getPageForKey() {
      return this.pages[key];
    }
  }, {
    key: 'unwrapPage',
    value: function unwrapPage(page) {
      if (!page) return null;
      if (page.getWrappedInstance) {
        return page.getWrappedInstance();
      } else {
        return page;
      }
    }
  }, {
    key: 'pureRender',
    value: function pureRender() {
      return true;
    }
  }, {
    key: 'setPageProps',
    value: function setPageProps(newProps) {
      this.props.dispatch((0, _creators.setPageProps)(this.props.path, newProps));
    }
  }, {
    key: 'replacePageProps',
    value: function replacePageProps(newProps) {
      this.props.dispatch((0, _creators.replacePageProps)(this.props.path, newProps));
    }
  }]);

  return Page;
}(_react2.default.Component);

Page.propTypes = {
  pages: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.any),
  path: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string.isRequired),
  childPages: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    key: _react2.default.PropTypes.string.isRequired,
    page: _react2.default.PropTypes.string.isRequired,
    props: _react2.default.PropTypes.object
  })),
  dispatch: _react2.default.PropTypes.func,
  root: _react2.default.PropTypes.bool.isRequired
};
Page.defaultProps = {
  pages: {},
  path: [],
  childPages: [],
  root: false
};
exports.default = Page;