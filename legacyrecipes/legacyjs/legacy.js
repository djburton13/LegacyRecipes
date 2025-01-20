
var app = angular.module('legacyapp', ['ngRoute', 'ngFileUpload']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'main.html'  
        })
        .when('/create', {
            templateUrl: 'create.html',  
            controller: 'createController'
        })
        .when("/update/:recipeId", {
            templateUrl: 'update.html',
            controller: 'updatecontroller'
        })
        .when('/search', {
            templateUrl: 'search.html',  
            controller: 'searchController'        
        })
        .when('/mysearch', {
            templateUrl: 'mysearch.html',  
            controller: 'mysearchController'        
        })
        .when('/about', {
            templateUrl: 'about.html'  
        })
        .when('/cookingtips', {
            templateUrl: 'cookingtips.html',
            controller: 'cookingtipsController'
        })
        .otherwise({
            redirectTo: '/main'
        });
});







