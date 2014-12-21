'use strict';

var zenginCode = require('zengin-code');

module.exports = function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {},
    compile: function (element, attributes) {
      attributes.$set('maxlength', 4);
      attributes.$set('pattern', '[0-9]*');
      return function (scope, element, attributes, ngModelController) {
        scope.$watch(function () {
          return ngModelController.$modelValue;
        }, function () {
          if (!!zenginCode[ngModelController.$modelValue]) {
            ngModelController.$bankName = zenginCode[ngModelController.$modelValue].name;
          } else {
            ngModelController.$bankName = '';
          }
        });

        ngModelController.$validators.zcBankCode = function (code) {
          return !!zenginCode[code];
        };
      };
    }
  };
};
