'use strict';

var angular = require('angular');

describe('bank-code', function () {

  beforeEach(angular.mock.module(require('../')));

  var element, scope, controller;

  beforeEach(angular.mock.inject(function ($injector) {
    var $compile = $injector.get('$compile');
    element = angular.element('<input ng-model="bankCode" zc-bank-code>');
    scope = $injector.get('$rootScope').$new();
    $compile(element)(scope);
    controller = element.controller('ngModel');
  }));

  it('adds a numeric pattern', function () {
    expect(element.attr('pattern')).toEqual('[0-9]*');
  });

  it('adds maxlength attribute', function () {
    expect(element.attr('maxlength')).toEqual('4');
  });

  it('accepts a valid code', function () {
    controller.$setViewValue('0001');
    expect(controller.$valid).toBe(true);
    expect(scope.bankCode).toEqual('0001');
  });

  it('rejects an invalid code', function () {
    controller.$setViewValue('0002');
    expect(controller.$valid).toBe(false);
    expect(scope.bankCode).toBeUndefined();
  });
});
