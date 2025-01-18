(function () {
    var legacyapp = angular.module('legacyapp');

    legacyapp.controller('createController', function ($scope, $http) {

        // Predefined values for dropdowns
        $scope.mealType = ['Breakfast', 'Dinner', 'Lunch', 'Quickmeal', 'Sauces', 'Soups'];
        $scope.cuisineType = ['Italian', 'LatinAmerica', 'American', 'Asian', 'European', 'Southern'];
        $scope.familyFavorite = ['Mom', 'Dad', 'Grandma', 'Grandpa', 'Brother', 'Sister', 'Aunt', 'Uncle', 'Stepmom', 'Stepdad', 'Cousin', 'Other'];

        // Initialize variables
        $scope.showCreateSuccess = false;
        $scope.disableCreate = false;
        $scope.recipe = {};

        // Create Recipe Function
        $scope.createRecipe = function () {
            $http.post('http://localhost:8080/api/recipes', $scope.recipe)
                .then(function (response) {
                    // Show success message
                    $scope.showCreateSuccess = true;

                    // Disable the create button temporarily
                    $scope.disableCreate = true;

                    // Optionally, clear form fields (comment this out if you want the form to persist)
                    $scope.recipe = {};
                }, function (response) {
                    // Log error and notify the user
                    console.log('Error during HTTP POST: ' + response.status);
                    alert('Failed to create recipe. Please try again.');
                });
        };

        // Clear Form Function
        $scope.clear = function () {
            $scope.recipe = {}; // Clear all fields
            $scope.createForm.$setUntouched(); // Reset form validation
            $scope.createForm.$setPristine();
            $scope.disableCreate = false;
            $scope.showCreateSuccess = false; // Hide success message
        };
    });
})();
