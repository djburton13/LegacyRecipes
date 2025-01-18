(function () {
    var legacyapp = angular.module('legacyapp');

    legacyapp.controller('mysearchController', function ($scope, $http, $location) {

		$scope.getAllRecipes = function() {
            $http.get("http://localhost:8080/api/recipes")
            .then(function (response) {
                $scope.recipes = response.data;
                console.log('number of recipes: ' + $scope.recipes.length);
            }, function(response) {
                console.log('error http GET recipes: ' + response.status);
            
            }) 

            }
            $scope.getAllRecipes();
            
            $scope.goToUpdateView = function(reciepeId) {
                console.log("go to update view: " + reciepeId);
                $location.path('/update/' + reciepeId);
            }
});

})();