'use strict';

var angular = require('angular');

describe('branch-code', function () {

  beforeEach(angular.mock.module(require('../')));

  var element, scope, controller;

  beforeEach(angular.mock.inject(function ($injector) {
    var $compile = $injector.get('$compile');
    element = angular.element('<input ng-model="branchCode" zc-branch-code bank-code="bankCode">');
    scope = $injector.get('$rootScope').$new();
    scope.bankCode = '0001';
    $compile(element)(scope);
    controller = element.controller('ngModel');
  }));

  it('adds a numeric pattern', function () {
    expect(element.attr('pattern')).toEqual('[0-9]*');
  });

  it('adds maxlength attribute', function () {
    expect(element.attr('maxlength')).toEqual('3');
  });

  it('accepts a valid code', function () {
    controller.$setViewValue('001');
    expect(controller.$valid).toBe(true);
    expect(scope.branchCode).toEqual('001');
  });

  it('rejects an invalid code', function () {
    controller.$setViewValue('999');
    expect(controller.$valid).toBe(false);
    expect(scope.branchCode).toBeUndefined();
  });
});
