'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = undefined;

var _react = _interopRequireDefault(require('react'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** A Progressbar for showing deterministic progress. */
const ProgressBar = exports.ProgressBar = props => _react.default.createElement('progress', Object.assign({ value: props.value, max: props.max }, props)); /**
                                                                                                                                                            * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                            * All rights reserved.
                                                                                                                                                            *
                                                                                                                                                            * This source code is licensed under the license found in the LICENSE file in
                                                                                                                                                            * the root directory of this source tree.
                                                                                                                                                            *
                                                                                                                                                            * 
                                                                                                                                                            * @format
                                                                                                                                                            */