'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactTransitionGroup = require('../ReactTransitionGroup');

var _ReactTransitionGroup2 = _interopRequireDefault(_ReactTransitionGroup);

var _Page2 = require('../Page');

var _Page3 = _interopRequireDefault(_Page2);

var _StackView = require('./StackView');

var _StackView2 = _interopRequireDefault(_StackView);

var _NavigationBar = require('./NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _last = require('lodash/last');

var _last2 = _interopRequireDefault(_last);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _addPageAction = require('../../addPageAction');

var _addPageAction2 = _interopRequireDefault(_addPageAction);

var _types = require('./action/types');

var _creators = require('./action/creators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _addPageAction2.default)(_types.PUSH_STACK, function (props, action) {
  props.childPages.push(action.payload.page);
  return props;
});

(0, _addPageAction2.default)(_types.POP_STACK, function (props, action) {
  props.childPages.pop();
  return props;
});

_Page3.default.prototype.navigationItem = function () {
  return {};
};

_Page3.default.prototype.pushStack = function (desc) {
  if (this.superPage) {
    this.superPage.pushStack(desc);
  }
};

_Page3.default.prototype.popStack = function () {
  if (this.superPage) {
    this.superPage.popStack();
  }
};

var StackPage = function (_Page) {
  _inherits(StackPage, _Page);

  function StackPage(props, context) {
    _classCallCheck(this, StackPage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StackPage).call(this, props, context));

    _this.containers = {};
    _this.noLazyLoading();
    return _this;
  }

  _createClass(StackPage, [{
    key: 'renderPage',
    value: function renderPage() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'stack-page' },
        _react2.default.createElement(_NavigationBar2.default, { ref: 'navigationBar' }),
        _react2.default.createElement(
          _ReactTransitionGroup2.default,
          { component: 'div', className: 'stack' },
          this.props.childPages.map(function (i, n, a) {
            return _react2.default.createElement(
              _StackView2.default,
              { hasNavBar: true, hasTabBar: _this2.props.hasTabBar, key: i.key, first: n === 0, last: n === a.length - 1, ref: function ref(r) {
                  return _this2.containers[i.key] = r;
                } },
              _this2.pageRender(i)
            );
          })
        )
      );
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

      return (0, _last2.default)(props.childPages).key;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(StackPage.prototype), 'componentDidMount', this).call(this);
      this.update();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      _get(Object.getPrototypeOf(StackPage.prototype), 'componentWillUpdate', this).call(this, nextProps, nextState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      _get(Object.getPrototypeOf(StackPage.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState);
      var currentSelectedKey = this.getSelectedPageKey();
      var previousSelectedKey = this.getSelectedPageKey(prevProps);
      if (currentSelectedKey !== previousSelectedKey) {
        this.getSelectedPage().pageWillAppear();
        if (this.pages[previousSelectedKey]) {
          this.pages[previousSelectedKey].pageWillDisappear();
        }
      }
      this.update(prevProps, prevState);
    }
  }, {
    key: 'update',
    value: function update(prevProps, prevState) {
      if (prevProps && prevState && (0, _isEqual2.default)(this.props, prevProps) && (0, _isEqual2.default)(this.state, prevState)) {
        return;
      }
      this.updateNavigationBar();
      this.updatePageContainers();
      this.updateTabBar();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return true;
    }
  }, {
    key: 'updateNavigationBar',
    value: function updateNavigationBar() {
      var _this3 = this;

      var keyArray = (0, _map2.default)(this.props.childPages, function (i) {
        return i.key;
      });
      var pageArray = (0, _map2.default)(keyArray, function (k) {
        return _this3.pages[k];
      });
      var itemsArray = (0, _map2.default)(pageArray, function (p) {
        return p.navigationItem();
      });
      this.refs.navigationBar.setState({ stack: itemsArray });
    }
  }, {
    key: 'updateTabBar',
    value: function updateTabBar() {
      var _this4 = this;

      var keyArray = (0, _map2.default)(this.props.childPages, function (i) {
        return i.key;
      });
      var pageArray = (0, _map2.default)(keyArray, function (k) {
        return _this4.pages[k];
      });
      var hideTabBar = (0, _find2.default)(pageArray, function (p) {
        return p.beyondTabBar();
      });
      if (hideTabBar) {
        this.hideTabBar();
      } else {
        this.showTabBar();
      }
    }
  }, {
    key: 'updatePageContainers',
    value: function updatePageContainers() {
      var _this5 = this;

      var keyArray = (0, _map2.default)(this.props.childPages, function (i) {
        return i.key;
      });
      var higherOrder = false;
      (0, _map2.default)(keyArray, function (k) {
        var p = _this5.pages[k];
        if (p.beyondTabBar()) {
          higherOrder = true;
        }
        if (higherOrder) {
          _this5.containers[k].setState({ beyondTabBar: true });
        } else {
          _this5.containers[k].setState({ beyondTabBar: false });
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(StackPage.prototype), 'componentWillUnmount', this).call(this);
    }
  }, {
    key: 'pageWillAppear',
    value: function pageWillAppear() {
      _get(Object.getPrototypeOf(StackPage.prototype), 'pageWillAppear', this).call(this);
      this.getSelectedPage().pageWillAppear();
    }
  }, {
    key: 'pageDidAppear',
    value: function pageDidAppear() {
      _get(Object.getPrototypeOf(StackPage.prototype), 'pageDidAppear', this).call(this);
      this.getSelectedPage().pageDidAppear();
    }
  }, {
    key: 'pageWillDisappear',
    value: function pageWillDisappear() {
      _get(Object.getPrototypeOf(StackPage.prototype), 'pageWillDisappear', this).call(this);
      this.getSelectedPage().pageDidAppear();
    }
  }, {
    key: 'pageDidDisappear',
    value: function pageDidDisappear() {
      _get(Object.getPrototypeOf(StackPage.prototype), 'pageDidDisappear', this).call(this);
      this.getSelectedPage().pageDidDisappear();
    }
  }, {
    key: 'pushStack',
    value: function pushStack(desc) {
      this.props.dispatch((0, _creators.pushStack)(this.props.path, desc));
    }
  }, {
    key: 'popStack',
    value: function popStack() {
      this.props.dispatch((0, _creators.popStack)(this.props.path));
    }
  }, {
    key: 'pureRender',
    value: function pureRender() {
      return false;
    }
  }]);

  return StackPage;
}(_Page3.default);

StackPage.propTypes = {
  hasTabBar: _react2.default.PropTypes.bool,
  childPages: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    key: _react2.default.PropTypes.string.isRequired,
    page: _react2.default.PropTypes.string.isRequired,
    props: _react2.default.PropTypes.object
  }))
};
exports.default = StackPage;