(function () {
    var legacyapp = angular.module('legacyapp');

    legacyapp.controller('createController', function ($scope, $http) {

        // Predefined values for dropdowns
        $scope.mealType = ['Breakfast', 'Dinner', 'Lunch', 'Dessert'];
        $scope.cuisineType = ['Italian', 'LatinAmerica', 'American', 'Asian', 'European', 'Southern'];
        $scope.familyFavorite = ['Mom', 'Dad', 'Grandma', 'Grandpa', 'Brother', 'Sister', 'Aunt', 'Uncle', 'Stepmom', 'Stepdad', 'Cousin', 'Other'];

        // Initialize variables
        $scope.showCreateSuccess = false;
        $scope.disableCreate = false;
        $scope.recipe = {};

        // Create Recipe Function
        $scope.createRecipe = function () {
            const file = document.getElementById('fileUploadField').files[0];
            const fileReader = new FileReader();
        // event handler that is called with the load event is fired
            fileReader.onload = function(event) {
              var data = fileReader.result;
              if (data !== undefined && data.length > 0) {
             
              $scope.recipe.image = data.split(',')[1];
              } else {
               $scope.recipe.image = '';
              }
              $scope.postRecipe();
            }     
        // when the readAsDataURL is finished, then the onload event is called
            if (file !== undefined) {
               fileReader.readAsDataURL(file);
            } else {
        $scope.recipe.image = '';
        $scope.recipe();
            }
            
        };
        $scope.postRecipe = function () {
            $http.post('http://localhost:8080/api/recipes', $scope.recipe)
                .then(function (response) {
                    // Show success message
                    $scope.showCreateSuccess = true;

                    // Disable the create button temporarily
                    $scope.disableCreate = true;

                    // Optionally, clear form fields (comment this out if you want the form to persist)
                    $scope.recipe = {};
                    $scope.clear();
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth" // Smooth scrolling
                    });
                }, function (response) {
                    // Log error and notify the user
                    console.log('Error during HTTP POST: ' + response.status);
                    alert('Failed to create recipe. Please try again.');
                });
        }
        // Clear Form Function
        $scope.clear = function () {
            $scope.recipe = {}; // Clear all fields
            $scope.createForm.$setUntouched(); // Reset form validation
            $scope.createForm.$setPristine();
            $scope.disableCreate = false;
            
        };
    });
})();
