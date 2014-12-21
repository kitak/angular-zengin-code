'use strict';

var zenginCode = require('zengin-code');

module.exports = function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      zcBankCode: '='
    },
    compile: function (element, attributes) {
      attributes.$set('maxlength', 3);
      attributes.$set('pattern', '[0-9]*');
      return function (scope, element, attributes, ngModelController) {
        var parentForm = element.controller('form');
        var existBank = function (bankCode) {
          return !!zenginCode[bankCode];
        };

        var existBranch = function (bankCode, branchCode) {
          return existBank(bankCode) && !!zenginCode[bankCode].branches[branchCode];
        };

        scope.$watch(function () {
          return {
            zcBankCode: scope.zcBankCode,
            zcBranchCode: ngModelController.$modelValue
          };
        }, function () {
          if (existBranch(scope.zcBankCode, ngModelController.$modelValue)) {
            ngModelController.$branchName = zenginCode[scope.zcBankCode].branches[ngModelController.$modelValue].name;
          } else {
            ngModelController.$branchName = '';
          }
        }, true);

        ngModelController.$validators.zcBranchCode = function (code) {
          return existBranch(scope.zcBankCode, ngModelController.$modelValue);
        };
      };
    }
  };
};
