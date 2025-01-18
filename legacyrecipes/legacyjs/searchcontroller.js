(function () {
    var legacyapp = angular.module('legacyapp');

    legacyapp.controller('searchController', function ($scope, $http, $location) {
        $scope.search = true;
        $scope.mealType = "Dinner";
        $scope.cuisineType = "Italian";
        $scope.familyFavorite = "Mom";
        $scope.searchQuery = ""; 

      
        $scope.searchbyMealType = function () {
            $http.get("http://localhost:8080/api/recipes/mealtype/" + $scope.mealType)
                .then(function (response) {
                    $scope.search = false;
                    $scope.recipes = response.data;
                    console.log('Number of recipes by meal type: ' + $scope.recipes.length);
                }, function (response) {
                    console.log('Error HTTP GET recipes by meal type: ' + response.status);
                });
        };

        
        $scope.searchbyCuisineType = function () {
            $http.get("http://localhost:8080/api/recipes/cuisine/" + $scope.cuisineType)
                .then(function (response) {
                    $scope.search = false;
                    $scope.recipes = response.data;
                    console.log('Number of recipes by cuisine type: ' + $scope.recipes.length);
                }, function (response) {
                    console.log('Error HTTP GET recipes by cuisine type: ' + response.status);
                });
        };

        
        $scope.searchbyfamilyFavorites = function () {
            $http.get("http://localhost:8080/api/recipes/familyfavorite/" + $scope.familyFavorite)
                .then(function (response) {
                    $scope.search = false;
                    $scope.recipes = response.data;
                    console.log('Number of recipes by family favorite: ' + $scope.recipes.length);
                }, function (response) {
                    console.log('Error HTTP GET recipes by family favorite: ' + response.status);
                });
        };

        $scope.searchbyAllTypes = function () {
            $http.get("http://localhost:8080/api/recipes/search/" + $scope.mealType + '/' + $scope.cuisineType + '/' + $scope.familyFavorite)
                .then(function (response) {
                    $scope.search = false;
                    $scope.recipes = response.data;
                    console.log('Number of recipes by family favorite: ' + $scope.recipes.length);
                }, function (response) {
                    console.log('Error HTTP GET recipes by family favorite: ' + response.status);
                });
        };

        
        $scope.searchRecipes = function () {
        
            $http.get('http://localhost:8080/api/recipes/search/' + $scope.searchQuery)
                .then(function (response) {
                    $scope.search = false;
                    $scope.recipes = response.data;
                    console.log('Filtered recipes:', $scope.recipes);
                }, function (error) {
                    console.error('Error searching recipes:', error);
                });
        };

        
        $scope.close = function () {
            $scope.search = true;
        };

        
        $scope.goToUpdateView = function (recipeId) {
            console.log("Go to update view: " + recipeId);
            $location.path('/update/' + recipeId);
        };
    });
})();
