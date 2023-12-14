import React from 'react';
import { useLocale } from '../LocaleProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../../../../apps/uci/web/src/config/config';
export var SendButton = function SendButton(_ref) {
  var _config$chatWindow, _config$chatWindow$in, _config$chatWindow$in2;
  var disabled = _ref.disabled,
    onClick = _ref.onClick;
  var _useLocale = useLocale('Composer'),
    trans = _useLocale.trans;
  return /*#__PURE__*/React.createElement("div", {
    className: "Composer-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "Composer-sendBtn",
    disabled: disabled,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: config === null || config === void 0 ? void 0 : (_config$chatWindow = config.chatWindow) === null || _config$chatWindow === void 0 ? void 0 : (_config$chatWindow$in = _config$chatWindow.innerWindow) === null || _config$chatWindow$in === void 0 ? void 0 : (_config$chatWindow$in2 = _config$chatWindow$in.input) === null || _config$chatWindow$in2 === void 0 ? void 0 : _config$chatWindow$in2.icon
  })));
};