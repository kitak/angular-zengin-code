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

  it('accepts a valid cord', function () {
    controller.$setViewValue('0001');
    expect(controller.$valid).toBe(true);
    expect(scope.bankCode).toEqual('0001');
  });
});
