'use strict';

var demo = angular.module('demo', ['ngRoute', 'angoose.client', 'angoose.ui','ui.bootstrap', "ui.bootstrap.tpls"])
        .config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.when("/login", {templateUrl:'/templates/login.tpl'});
            $routeProvider.when("/todomvc", {templateUrl:'/templates/todo.tpl' });
            $routeProvider.when('/:selectedStatus?', {templateUrl:'/templates/todo.tpl' });
}]);

// login controller handles user login
demo.controller('login-controller', function($scope, $rootScope, LoginService){ 
    // LoginService is provided by angoose-users extension
    enterscope($scope, "LoginCtrl");
    var login = $scope.login = {username: '', password:'' }  
    $scope.doLogin = function() {
        console.log("logining, scope", $scope);
        LoginService.signin( login.username, login.password, function(err, user){
           if(!err && user) {
                console.log("LoginCtrl post login OK");
                $rootScope.user = user;
                //$location.path("/dash")
            }
            else {
                console.error("Error login", err);
                err && alert("Invalid username or password");
            }
        })
    };
    $scope.adminLogin = function(){
        login.username = 'admin@demo.com';
        login.password = 'demo';
        $scope.doLogin();
    }
});

demo.controller("nav-controller", function($scope, $rootScope,  $location, LoginService){
     $scope.doLogout = function(){
        LoginService.signout(function(){
            console.log("Sign out complete");
            $rootScope.user = undefined;
            $location.path("/login");
        });
    }
});

// default exception handler
demo.factory('$exceptionHandler', function ($injector){
   return function(exception, cause){
        try{
            var $log = $injector.get("$log");
            $log.error.apply( $log, arguments );
            var $alert = $injector.get("$alert");
            $alert.error(exception + "");
        }
        catch(err){
            console.error("Interesting - error in error handler!", err)
        }
   } ;
});

demo.run(function($rootScope, $alert, $location){  // $alert service is provided by angoose.ui
     // when route changes, clear the error/warn/success messages if any
     $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        $alert.clear();
     });
     
     // when AuthError occurs from server side, go to login page
     $rootScope.$on( "AngooseError", function(event,ex ) {
           if(ex.name == 'AuthError')
                $location.path("/login");
     });
});
