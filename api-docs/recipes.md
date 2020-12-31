# Recipes

Used to get, create, edit and delete recipes 

BASE URL: `/recipes`

## Get All Recipes

URL: `/`

Method: `GET`

Auth Required: No

### Successful Response

Condition: User can see all recipes

Code: `200 OK`

Example Response: 
```
    [  
        {  
            "id": 31,  
            "cocktail_name": "New Cocktail",  
            "cocktail_type": "Martini",  
            "whiskey_type": "Japanese Whisky",  
            "description": "Newest and greatest",  
            "date_created": "2020-12-19T19:03:34.149Z",  
            "created_by": 1,  
            "user": "John"  
        },  
        {  
            "id": 30,  
            "cocktail_name": "Cool Hip Cocktail",  
            "cocktail_type": "Highball",  
            "whiskey_type": "Tennessee Whiskey",  
            "description": "New Hot cocktail everyone will like.",  
            "date_created": "2020-12-19T18:53:53.542Z",  
            "created_by": 1,  
            "user": "John"  
        }  
    ]
```

## Create New Recipe

URL: `/`

Method: `POST`

Auth Required: Yes, must be logged in.

### Successful Response

Condition: User successfully creates recipe

Example JSON Request: 
```
{
    "cocktail_name": "Perfect Manhattan",
    "cocktail_type": "Martini",
    "whiskey_type": "Rye Whiskey",
    "description": "Best Straight up cocktail",
    "date_created": "2020-12-16T02:34:37.466Z",
    "created_by": 5,
    "ingredients": [
        {
            "ingredient_string": "2oz Rye Whiskey"
        },
        {
            "ingredient_string": "2 dashes bitters"
        },
        {
            "ingredient_string": "1/2 oz dry vermouth"
        },
        {
            "ingredient_string": "1/2 oz sweet vermouth"
        }
    ],
    "cocktail_steps": [
        {
            "step_number": 1,
            "step_content": "Chill Glass in freezer"
        },
        {
            "step_number": 2,
            "step_content": "In a shaker with ice pour in ingredients"
        },
        {
            "step_number": 3,
            "step_content": "Stir really well to mix together"
        },
        {
            "step_number": 4,
            "step_content": "Take glass out of freezer"
        },
        {
            "step_number": 5,
            "step_content": "Strain shaker contents into the glass"
        },
        {
            "step_number": 6,
            "step_content": "Enjoy!"
        }
    ]
}
```

Code: `201 Created`

Example Response:
```
{
    "id": 36,
    "cocktail_name": "Perfect Manhattan",
    "cocktail_type": "Martini",
    "whiskey_type": "Rye Whiskey",
    "description": "Best Straight up cocktail",
    "date_created": "2020-12-31T01:56:05.249Z",
    "created_by": 5
}
```

## Get Recipe by ID

URL: `/:recipeId`

Method: `GET`

Auth Required: No

### Successful Response

Condition: Recipe with matching ID is retrieved

Code: `200 OK`

Required params: `{recipeId}`

Example Response: 
```
{
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
}
```

## Delete a Recipe

URL: `/:recipeId`

Method: `DELETE`

Auth Required: Yes, must be logged in and creator of recipe.

### Successful Response

Condition: User/Creator of recipe successfully deletes record

Code: `204 No Content`

Required params: `{recipeId}`

Example Response:
```
{}
```

## Edit a Recipe

URL: `/:recipeId`

Method: `PATCH`

Auth Required: Yes, must be logged in and creator of recipe.

### Successful Response

Condition: User/Creator of recipe successfully deletes record

Code: `204 No Content`

Required params: `{recipeId}`

Example Response:
```
{}
```