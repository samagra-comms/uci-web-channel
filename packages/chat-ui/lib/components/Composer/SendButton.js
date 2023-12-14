"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _LocaleProvider = require("../LocaleProvider");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _config = require("../../../../../apps/uci/web/src/config/config");
var SendButton = function SendButton(_ref) {
  var _config$chatWindow, _config$chatWindow$in, _config$chatWindow$in2;
  var disabled = _ref.disabled,
    onClick = _ref.onClick;
  var _useLocale = (0, _LocaleProvider.useLocale)('Composer'),
    trans = _useLocale.trans;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Composer-actions"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "Composer-sendBtn",
    disabled: disabled,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _config.config === null || _config.config === void 0 ? void 0 : (_config$chatWindow = _config.config.chatWindow) === null || _config$chatWindow === void 0 ? void 0 : (_config$chatWindow$in = _config$chatWindow.innerWindow) === null || _config$chatWindow$in === void 0 ? void 0 : (_config$chatWindow$in2 = _config$chatWindow$in.input) === null || _config$chatWindow$in2 === void 0 ? void 0 : _config$chatWindow$in2.icon
  })));
};
exports.SendButton = SendButton;