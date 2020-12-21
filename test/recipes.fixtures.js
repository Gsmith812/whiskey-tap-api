function makeRecipesArray() {
    const recipes = [
        {
            id: 1,
            cocktail_name: "Wild Turkey",
            cocktail_type: "Lowball",
            whiskey_type: "Tennessee Whiskey",
            description: null,
            date_created: "2020-12-06T03:32:49.725Z",
            created_by: 1
        },
        {
            id: 2,
            cocktail_name: "Crazy Aces",
            cocktail_type: "Lowball",
            whiskey_type: "Single Malt Whisky",
            description: null,
            date_created: "2020-12-06T03:32:49.725Z",
            created_by: 2
        },
        {
            id: 3,
            cocktail_name: "Old Fashioned",
            cocktail_type: "Lowball",
            whiskey_type: "Bourbon Whiskey",
            description: "Classic drink that needs no description",
            date_created: "2020-12-06T03:32:49.725Z",
            created_by: 3
        },
        {
            id: 4,
            cocktail_name: "Something Sweet",
            cocktail_type: "Snifter",
            whiskey_type: "Japanese Whisky",
            description: "Something sweet certainly...",
            date_created: "2020-12-06T03:32:49.725Z",
            created_by: 5
        },
        {
            id: 5,
            cocktail_name: "Perfect Manhattan",
            cocktail_type: "Martini",
            whiskey_type: "Rye Whiskey",
            description: "Best Straight up cocktail",
            date_created: "2020-12-06T03:32:49.725Z",
            created_by: 5
        },
        {
            id: 6,
            cocktail_name: "Fancy Schmanzy",
            cocktail_type: "Highball",
            whiskey_type: "Irish Whiskey",
            description: null,
            date_created: "2020-12-06T03:32:49.725Z",
            created_by: 6
        }
    ];

    const expectedRecipeList = [
        {
            "id": 1,
            "cocktail_name": "Wild Turkey",
            "cocktail_type": "Lowball",
            "whiskey_type": "Tennessee Whiskey",
            "description": null,
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 1,
            "user": "John"
        },
        {
            "id": 2,
            "cocktail_name": "Crazy Aces",
            "cocktail_type": "Lowball",
            "whiskey_type": "Single Malt Whisky",
            "description": null,
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 2,
            "user": "Jane"
        },
        {
            "id": 3,
            "cocktail_name": "Old Fashioned",
            "cocktail_type": "Lowball",
            "whiskey_type": "Bourbon Whiskey",
            "description": "Classic drink that needs no description",
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 3,
            "user": "Jason"
        },
        {
            "id": 4,
            "cocktail_name": "Something Sweet",
            "cocktail_type": "Snifter",
            "whiskey_type": "Japanese Whisky",
            "description": "Something sweet certainly...",
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 5,
            "user": "Louis"
        },
        {
            "id": 5,
            "cocktail_name": "Perfect Manhattan",
            "cocktail_type": "Martini",
            "whiskey_type": "Rye Whiskey",
            "description": "Best Straight up cocktail",
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 5,
            "user": "Louis"
        },
        {
            "id": 6,
            "cocktail_name": "Fancy Schmanzy",
            "cocktail_type": "Highball",
            "whiskey_type": "Irish Whiskey",
            "description": null,
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 6,
            "user": "Minous"
        }
    ];

    const newRecipe = {
        "id": 1,
        "cocktail_name": "Perfect Manhattan",
        "cocktail_type": "Martini",
        "whiskey_type": "Rye Whiskey",
        "description": "Best Straight up cocktail",
        "date_created": "2020-12-16T02:34:37.466Z",
        "created_by": 5,
        "user": "Louis",
        "ingredients": [
            {
                "id": 1,
                "ingredient_string": "2oz Rye Whiskey",
                "recipe_id": 1
            },
            {
                "id": 2,
                "ingredient_string": "2 dashes bitters",
                "recipe_id": 1
            },
            {
                "id": 3,
                "ingredient_string": "1/2 oz dry vermouth",
                "recipe_id": 1
            },
            {
                "id": 4,
                "ingredient_string": "1/2 oz sweet vermouth",
                "recipe_id": 1
            }
        ],
        "cocktail_steps": [
            {
                "id": 1,
                "step_number": 1,
                "step_content": "Chill Glass in freezer",
                "recipe_id": 1
            },
            {
                "id": 2,
                "step_number": 2,
                "step_content": "In a shaker with ice pour in ingredients",
                "recipe_id": 1
            },
            {
                "id": 3,
                "step_number": 3,
                "step_content": "Stir really well to mix together",
                "recipe_id": 1
            },
            {
                "id": 4,
                "step_number": 4,
                "step_content": "Take glass out of freezer",
                "recipe_id": 1
            },
            {
                "id": 5,
                "step_number": 5,
                "step_content": "Strain shaker contents into the glass",
                "recipe_id": 1
            },
            {
                "id": 6,
                "step_number": 6,
                "step_content": "Enjoy!",
                "recipe_id": 1
            }
        ]
    };

    const expectedNewRecipe = {
        "id": 1,
        "cocktail_name": "Perfect Manhattan",
        "cocktail_type": "Martini",
        "whiskey_type": "Rye Whiskey",
        "description": "Best Straight up cocktail",
        "date_created": "2020-12-16T02:34:37.466Z",
        "created_by": 5,
        "user": "Louis"
    };

    const testRecipe = {
        "id": 1,
        "cocktail_name": "Perfect Manhattan",
        "cocktail_type": "Martini",
        "whiskey_type": "Rye Whiskey",
        "description": "Best Straight up cocktail",
        "date_created": "2020-12-16T02:34:37.466Z",
        "created_by": 5
    };

    const testIngredients = [
        {
            "id": 1,
            "ingredient_string": "2oz Rye Whiskey",
            "recipe_id": 1
        },
        {
            "id": 2,
            "ingredient_string": "2 dashes bitters",
            "recipe_id": 1
        },
        {
            "id": 3,
            "ingredient_string": "1/2 oz dry vermouth",
            "recipe_id": 1
        },
        {
            "id": 4,
            "ingredient_string": "1/2 oz sweet vermouth",
            "recipe_id": 1
        }
    ]

    const testSteps = [
        {
            "id": 1,
            "step_number": 1,
            "step_content": "Chill Glass in freezer",
            "recipe_id": 1
        },
        {
            "id": 2,
            "step_number": 2,
            "step_content": "In a shaker with ice pour in ingredients",
            "recipe_id": 1
        },
        {
            "id": 3,
            "step_number": 3,
            "step_content": "Stir really well to mix together",
            "recipe_id": 1
        },
        {
            "id": 4,
            "step_number": 4,
            "step_content": "Take glass out of freezer",
            "recipe_id": 1
        },
        {
            "id": 5,
            "step_number": 5,
            "step_content": "Strain shaker contents into the glass",
            "recipe_id": 1
        },
        {
            "id": 6,
            "step_number": 6,
            "step_content": "Enjoy!",
            "recipe_id": 1
        }
    ]

    return {
        recipes,
        expectedRecipeList,
        newRecipe,
        expectedNewRecipe,
        testRecipe,
        testIngredients,
        testSteps
    }
}

module.exports = {
    makeRecipesArray,
}