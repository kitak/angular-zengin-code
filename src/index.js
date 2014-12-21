'use strict';

module.exports = require('angular')
  .module('zengin-code', [])
  .value('zenginCode', require('zengin-code'))
  .directive('zcBankCode', require('./bank-code'))
  .directive('zcBranchCode', require('./branch-code'))
  .name;
