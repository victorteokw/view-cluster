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

var _ModalView = require('./ModalView');

var _ModalView2 = _interopRequireDefault(_ModalView);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _addPageAction = require('../../addPageAction');

var _addPageAction2 = _interopRequireDefault(_addPageAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _addPageAction2.default)('PRESENT_MODAL', function (props, action) {
  props.childPages.push(action.payload.page);
  return props;
});

function _presentModal(path, page) {
  return {
    type: 'PRESENT_MODAL',
    payload: {
      path: path,
      page: page
    }
  };
}

(0, _addPageAction2.default)('DISMISS_MODAL', function (props, action) {
  (0, _filter2.default)(props.childPages, function (p) {
    return p.key !== action.payload.key;
  });
  return props;
});

function _dismissModal(path, key) {
  return {
    type: 'DISMISS_MODAL',
    payload: {
      path: path,
      key: key
    }
  };
}

_Page3.default.prototype.presentModal = function (props) {
  if (this.superPage) {
    this.superPage.presentModal(props);
  }
};

_Page3.default.prototype.dismissModal = function (key) {
  if (this.superPage) {
    this.superPage.dismissModal(key);
  }
};

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
        { component: 'div', className: 'modals-page' },
        this.props.childPages.map(function (m) {
          return _react2.default.createElement(
            _ModalView2.default,
            { key: m.key },
            _this2.pageRender(m)
          );
        })
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      _get(Object.getPrototypeOf(ModalsPage.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState);
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

      return last(props.childPages).key;
    }
  }, {
    key: 'pageWillAppear',
    value: function pageWillAppear() {
      _get(Object.getPrototypeOf(ModalsPage.prototype), 'pageWillAppear', this).call(this);
      if (this.getSelectedPage()) this.getSelectedPage().pageWillAppear();
    }
  }, {
    key: 'pageDidAppear',
    value: function pageDidAppear() {
      _get(Object.getPrototypeOf(ModalsPage.prototype), 'pageDidAppear', this).call(this);
      if (this.getSelectedPage()) this.getSelectedPage().pageDidAppear();
    }
  }, {
    key: 'pageWillDisappear',
    value: function pageWillDisappear() {
      _get(Object.getPrototypeOf(ModalsPage.prototype), 'pageWillDisappear', this).call(this);
      if (this.getSelectedPage()) this.getSelectedPage().pageDidAppear();
    }
  }, {
    key: 'pageDidDisappear',
    value: function pageDidDisappear() {
      _get(Object.getPrototypeOf(ModalsPage.prototype), 'pageDidDisappear', this).call(this);
      if (this.getSelectedPage()) this.getSelectedPage().pageDidDisappear();
    }
  }, {
    key: 'presentModal',
    value: function presentModal(props) {
      this.props.dispatch(_presentModal(this.props.path, props));
    }
  }, {
    key: 'dismissModal',
    value: function dismissModal(key) {
      this.props.dispatch(_dismissModal(this.props.path, key));
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
exports.default = ModalsPage;