// Access the previously created module 'legacyapp'

(function () {
    var legacyapp = angular.module('legacyapp');
    legacyapp.controller('updatecontroller', function ($scope, $http, $routeParams, $location) {

        $scope.mealType = ['Breakfast', 'Dinner', 'Lunch', 'Quickmeal' , 'Sauces', 'Soups'];
        $scope.cuisineType = ['Italian', 'LatinAmerica', 'American', 'Asian', 'European', 'Southern'];
        $scope.familyFavorite = ['Mom', 'Dad', 'Grandma', 'Grandpa', 'Brother', 'Sister', 'Aunt', 'Uncle', 'Stepmom', 'Stepdad', 'Cousin', 'Other'];

        $scope.getRecipesById = function () {
            $http.get("http://localhost:8080/api/recipes/" + $routeParams.recipeId)
                .then(function (response) {
                    var recipes = response.data;
                    if (recipes.length == 1) {
                        $scope.recipe = recipes[0];
                    } else {

                    }
                }, function (response) {
                    console.log('error http GET recipes by id: ' + response.status);
                });
        }
        $scope.getRecipesById();

        $scope.updateRecipe = function() {
			$http.put("http://localhost:8080/api/recipes", $scope.recipe)
			.then(function(response) {				
				$scope.updateStatus = 'Updated Successfully!';			
			}, function(response) {
				$scope.updateStatus = 'error trying to update recipe';	
				console.log('error http PUT recipes: ' + response.status);
			});
		}
        $scope.deleteRecipe = function() {
			$http.delete("http://localhost:8080/api/recipes/" + $scope.recipe.id)
			.then(function(response) {				
				$scope.updateStatus = 'Deleted Successfully!';	
				$scope.disableUpdate = true;
			}, function(response) {
				$scope.updateStatus = 'error trying to delete recipe';	
				console.log('error http DELETE recipes: ' + response.status);
			});
		}
        $scope.goToSearchView = function() {
            $location.path('/mysearch')
        }

    });
})()