(function () {
  'use strict';

  /**
   * usage: <textarea ng-model="content" redactor></textarea>
   *
   *    additional options:
   *      redactor: hash (pass in a redactor options hash)
   *
   */
  angular.module('angular-redactor', [])
    .directive("redactor", ['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {

          var options = attrs.redactor ? scope.$eval(attrs.redactor) : {};
            options.changeCallback= function updateModel(value) {
                scope.$apply(function () {
                    ngModel.$setViewValue(value);
                });
            }
          $timeout(function () {
              angular.element(element).redactor(options);
          });
        }
      };
    }]);
})();

