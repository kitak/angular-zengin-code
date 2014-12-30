(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * zengin-code
 * https://github.com/rosylilly/zengin_code
 */
(function() {
  'use strict';

  var zenginCode = {};


  if (typeof define === 'function' && define.amd) {
    define(function() { return zenginCode; });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = zenginCode;
  } else {
    window.zenginCode = zenginCode;
  }
})();

},{}],2:[function(require,module,exports){
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
            ngModelController.$bankName = zenginCode[''+ngModelController.$modelValue].name;
          } else {
            ngModelController.$bankName = '';
          }
        });

        ngModelController.$validators.zcBankCode = function (code) {
          return !!zenginCode[''+code];
        };
      };
    }
  };
};

},{"zengin-code":1}],3:[function(require,module,exports){
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

},{"zengin-code":1}],4:[function(require,module,exports){
(function (global){
'use strict';

module.exports = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null)
  .module('zengin-code', [])
  .value('zenginCode', require('zengin-code'))
  .directive('zcBankCode', require('./bank-code'))
  .directive('zcBranchCode', require('./branch-code'))
  .name;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./bank-code":2,"./branch-code":3,"zengin-code":1}]},{},[4]);