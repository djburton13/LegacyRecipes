var app = angular.module('legacyapp');

app.controller('cookingtipsController', function ($scope, $interval) {
    // Define conversion units
    $scope.units = {
        volume: ["Cups", "Tablespoons", "Teaspoons", "Milliliters"],
        weight: ["Grams", "Ounces", "Pounds", "Kilograms"],
        temperature: ["Celsius", "Fahrenheit"]
    };

    // Initialize conversion type and unit lists
    $scope.conversionType = '';
    $scope.availableUnits = [];

    // Update unit list when conversion type changes
    $scope.updateUnits = function () {
        if ($scope.conversionType && $scope.units[$scope.conversionType]) {
            $scope.availableUnits = $scope.units[$scope.conversionType];
        } else {
            $scope.availableUnits = [];
        }
        $scope.fromUnit = '';
        $scope.toUnit = '';
    };

    $scope.convert = function () {
        let value = parseFloat($scope.inputValue);
        if (isNaN(value) || !$scope.fromUnit || !$scope.toUnit) {
            $scope.result = "Please enter a valid number and select units.";
            return;
        }

        const conversions = {
            volume: {
                "Cups": { "Tablespoons": 16, "Teaspoons": 48, "Milliliters": 240 },
                "Tablespoons": { "Cups": 1 / 16, "Teaspoons": 3, "Milliliters": 15 },
                "Teaspoons": { "Cups": 1 / 48, "Tablespoons": 1 / 3, "Milliliters": 5 },
                "Milliliters": { "Cups": 1 / 240, "Tablespoons": 1 / 15, "Teaspoons": 1 / 5 }
            },
            weight: {
                "Grams": { "Ounces": 0.0353, "Pounds": 0.0022, "Kilograms": 0.001 },
                "Ounces": { "Grams": 28.35, "Pounds": 0.0625, "Kilograms": 0.0283 },
                "Pounds": { "Grams": 453.592, "Ounces": 16, "Kilograms": 0.4536 },
                "Kilograms": { "Grams": 1000, "Ounces": 35.274, "Pounds": 2.2046 }
            },
            temperature: {
                "Celsius": { "Fahrenheit": (value * 9 / 5) + 32 },
                "Fahrenheit": { "Celsius": (value - 32) * 5 / 9 }
            }
        };

        if ($scope.conversionType === "temperature") {
            if ($scope.fromUnit === "Celsius" && $scope.toUnit === "Fahrenheit") {
                $scope.result = (value * 9 / 5 + 32).toFixed(2) + " °F";
            } else if ($scope.fromUnit === "Fahrenheit" && $scope.toUnit === "Celsius") {
                $scope.result = ((value - 32) * 5 / 9).toFixed(2) + " °C";
            } else {
                $scope.result = value + " " + $scope.fromUnit;
            }
        } else {
            let conversionFactor = conversions[$scope.conversionType][$scope.fromUnit][$scope.toUnit];
            if (conversionFactor !== undefined) {
                $scope.result = (value * conversionFactor).toFixed(2) + " " + $scope.toUnit;
            } else {
                $scope.result = value + " " + $scope.fromUnit;
            }
        }
    };

    $scope.clearFields = function () {
        $scope.inputValue = '';
        $scope.result = null;
        $scope.fromUnit = '';
        $scope.toUnit = '';
        $scope.conversionType = '';
        $scope.availableUnits = [];
    };

    $scope.cookingTips = [
        "Always read the recipe all the way through before you start cooking.",
        "Keep your knives sharp for better safety and efficiency.",
        "Use room temperature ingredients for baking.",
        "Rinse your pasta with cold water after it is finished cooking to prevent it from becoming overcooked and sticky",
        "Taste as you go to adjust seasoning.",
        "Don’t overcrowd the pan when sautéing.",
        "Let meat rest after cooking for juicier results.",
        "Invest in a good set of measuring cups and spoons.",
        "Always wash your rice until the water is no longer cloudy.",
        "Never salt food from the container: Always pour into your hand and then season.",
        "Salt your pasta water to ensure your pasta is seasoned"
    ];

    let tipIndex = 0;
    $scope.currentTip = $scope.cookingTips[tipIndex];

    $interval(function () {
        tipIndex = (tipIndex + 1) % $scope.cookingTips.length;
        $scope.currentTip = $scope.cookingTips[tipIndex];
    }, 5000);
});
