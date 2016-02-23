'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Page2 = require('./../Page');

var _Page3 = _interopRequireDefault(_Page2);

var _TabBar = require('./TabBar');

var _TabBar2 = _interopRequireDefault(_TabBar);

var _TabView = require('./TabView');

var _TabView2 = _interopRequireDefault(_TabView);

var _TabBarItem = require('./TabBarItem');

var _TabBarItem2 = _interopRequireDefault(_TabBarItem);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _addPageAction = require('../../addPageAction');

var _addPageAction2 = _interopRequireDefault(_addPageAction);

var _types = require('./action/types');

var _creators = require('./action/creators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _addPageAction2.default)(_types.SELECT_TAB, function (props, action) {
  (0, _each2.default)(props.childPages, function (c) {
    c.selected = c.key === action.payload.key;
  });
  return props;
});

(0, _addPageAction2.default)(_types.PUSH_SELECTED_STACK, function (props, action) {
  (0, _each2.default)(props.childPages, function (c) {
    if (c.selected) {
      c.props.childPages.push(action.payload.page);
    }
  });
  return props;
});

_Page3.default.prototype.beyondTabBar = function () {
  return false;
};

_Page3.default.prototype.selectTab = function (key) {
  if (this.superPage) {
    this.superPage.selectTab(key);
  }
};

_Page3.default.prototype.showTabBar = function () {
  if (this.superPage) {
    this.superPage.showTabBar();
  }
};

_Page3.default.prototype.hideTabBar = function () {
  if (this.superPage) {
    this.superPage.hideTabBar();
  }
};

var TabsPage = function (_Page) {
  _inherits(TabsPage, _Page);

  function TabsPage(props, context) {
    _classCallCheck(this, TabsPage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TabsPage).call(this, props, context));

    _this.noLazyLoading();
    return _this;
  }

  _createClass(TabsPage, [{
    key: 'renderPage',
    value: function renderPage() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'tabs-page' },
        this.props.childPages.map(function (t) {
          return _react2.default.createElement(
            _TabView2.default,
            { key: t.key, selected: t.selected },
            _this2.pageRender(t)
          );
        }),
        _react2.default.createElement(
          _TabBar2.default,
          { ref: 'tabBar' },
          this.props.childPages.map(function (t) {
            return _react2.default.createElement(_TabBarItem2.default, _extends({}, (0, _omit2.default)(t, 'page', 'props'), { callback: _this2.selectTab.bind(_this2, t.key) }));
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

      return (0, _find2.default)(props.childPages, function (t) {
        return t.selected === true;
      }).key;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(TabsPage.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      _get(Object.getPrototypeOf(TabsPage.prototype), 'componentWillUpdate', this).call(this, nextProps, nextState);
      var currentSelectedKey = this.getSelectedPageKey();
      var nextSelectedKey = this.getSelectedPageKey(nextProps);
      if (nextSelectedKey !== currentSelectedKey) {
        this.getSelectedPage().pageWillDisappear();
        if (this.pages[nextSelectedKey]) {
          this.pages[nextSelectedKey].pageWillAppear();
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      _get(Object.getPrototypeOf(TabsPage.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState);
      var currentSelectedKey = this.getSelectedPageKey();
      var previousSelectedKey = this.getSelectedPageKey(prevProps);
      if (currentSelectedKey !== previousSelectedKey) {
        this.getSelectedPage().pageDidAppear();
        if (this.pages[previousSelectedKey]) {
          this.pages[previousSelectedKey].pageDidDisappear();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(TabsPage.prototype), 'componentWillUnmount', this).call(this);
    }
  }, {
    key: 'pageWillAppear',
    value: function pageWillAppear() {
      _get(Object.getPrototypeOf(TabsPage.prototype), 'pageWillAppear', this).call(this);
      this.getSelectedPage().pageWillAppear();
    }
  }, {
    key: 'pageDidAppear',
    value: function pageDidAppear() {
      _get(Object.getPrototypeOf(TabsPage.prototype), 'pageDidAppear', this).call(this);
      this.getSelectedPage().pageDidAppear();
    }
  }, {
    key: 'pageWillDisappear',
    value: function pageWillDisappear() {
      _get(Object.getPrototypeOf(TabsPage.prototype), 'pageWillDisappear', this).call(this);
      this.getSelectedPage().pageDidAppear();
    }
  }, {
    key: 'pageDidDisappear',
    value: function pageDidDisappear() {
      _get(Object.getPrototypeOf(TabsPage.prototype), 'pageDidDisappear', this).call(this);
      this.getSelectedPage().pageDidDisappear();
    }
  }, {
    key: 'selectTab',
    value: function selectTab(key) {
      this.props.dispatch((0, _creators.selectTab)(this.props.path, key));
    }
  }, {
    key: 'showTabBar',
    value: function showTabBar() {
      this.refs.tabBar.setState({ hide: false });
    }
  }, {
    key: 'hideTabBar',
    value: function hideTabBar() {
      this.refs.tabBar.setState({ hide: true });
    }
  }, {
    key: 'pureRender',
    value: function pureRender() {
      return false;
    }
  }]);

  return TabsPage;
}(_Page3.default);

TabsPage.propTypes = {
  childPages: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    key: _react2.default.PropTypes.string.isRequired,
    title: _react2.default.PropTypes.string.isRequired,
    selected: _react2.default.PropTypes.bool.isRequired,
    icon: _react2.default.PropTypes.string.isRequired,
    selectedIcon: _react2.default.PropTypes.string.isRequired,
    page: _react2.default.PropTypes.string.isRequired,
    props: _react2.default.PropTypes.object
  }))
};
exports.default = TabsPage;