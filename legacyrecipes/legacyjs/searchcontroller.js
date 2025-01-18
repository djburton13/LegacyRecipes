angular.module('legacyRecipesApp', [])
    .controller('searchController', function($scope, $http) {
        
        // Initialize loading state
        $scope.isLoading = false;

        // Recipes list and to display filtered recipes
        $scope.recipes = [];
        $scope.recipesToDisplay = [];

        // Initialize filters
        $scope.filters = {
            dinner: false,
            sauces: false,
            breakfast: false,
            quickmeals: false,
            soups: false,
            italian: false,
            latin: false,
            asian: false,
            southerncomfort: false,
            american: false,
            rustic: false,
            familyFavoriteMom: false,
            familyFavoriteDad: false,
            familyFavoriteGrandma: false,
            familyFavoriteGrandpa: false,
            familyFavoriteBrother: false,
            familyFavoriteSister: false,
            familyFavoriteAunt: false,
            familyFavoriteUncle: false,
            familyFavoriteCousin: false
        };

        // Fetch all recipes from the backend
        $scope.getAllRecipes = function() {
            $http.get("http://localhost:8080/api/recipes")
                .then(function(response) {
                    $scope.recipes = response.data;
                    $scope.recipesToDisplay = $scope.recipes;  // Initially display all recipes
                    console.log('Recipes loaded: ', $scope.recipes.length);
                }, function(response) {
                    console.log('Error fetching recipes: ', response);
                });
        };

        // Call getAllRecipes when the controller initializes
        $scope.getAllRecipes();

        // Search recipes based on the query and active filters
        $scope.searchRecipes = function() {
            if (!$scope.searchQuery && !$scope.isAnyFilterActive()) return; // Exit if no search query or active filters

        }

        // Toggle recipe details (ingredients and steps)
        $scope.toggleRecipeDetails = function(recipe) {
            recipe.showDetails = !recipe.showDetails;
        };

        // Clear search query and reset filters
        $scope.clearFancy = function() {
            $scope.filters = {
                dinner: false,
                sauces: false,
                breakfast: false,
                quickmeals: false,
                soups: false,
                italian: false,
                latin: false,
                asian: false,
                southerncomfort: false,
                american: false,
                rustic: false,
                familyFavoriteMom: false,
                familyFavoriteDad: false,
                familyFavoriteGrandma: false,
                familyFavoriteGrandpa: false,
                familyFavoriteBrother: false,
                familyFavoriteSister: false,
                familyFavoriteAunt: false,
                familyFavoriteUncle: false,
                familyFavoriteCousin: false
            };

            $scope.searchQuery = ''; 
            $scope.recipesToDisplay = $scope.recipes; 
            $scope.isLoading = false; 
        };

        // Check if any filters are active
        $scope.isAnyFilterActive = function() {
            return Object.values($scope.filters).some(function(value) {
                return value === true;
            });
        };
    });
