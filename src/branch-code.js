'use strict';

var zenginCode = require('zengin-code');

module.exports = function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      bankCode: '='
    },
    compile: function (element, attributes) {
      attributes.$set('maxlength', 3);
      attributes.$set('pattern', '[0-9]*');
      return function (scope, element, attributes, ngModelController) {
        var existBank = function (bankCode) {
          return !!zenginCode[''+bankCode];
        };

        var existBranch = function (bankCode, branchCode) {
          return existBank(bankCode) && !!zenginCode[''+bankCode].branches[branchCode];
        };

        scope.$watch(function () {
          return {
            zcBankCode: scope.bankCode,
            zcBranchCode: ngModelController.$modelValue
          };
        }, function () {
          if (existBranch(scope.bankCode, ngModelController.$modelValue)) {
            ngModelController.$branchName = zenginCode[''+scope.bankCode].branches[''+ngModelController.$modelValue].name;
          } else {
            ngModelController.$branchName = '';
          }
        }, true);

        ngModelController.$validators.zcBranchCode = function (code) {
          return existBranch(scope.bankCode, code);
        };
      };
    }
  };
};
