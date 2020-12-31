# Favorites

Used for users to add a recipe to their favorites list or remove it

BASE URL: `/favorites`

## Get User's Favorite Recipes

URL: `/:user_id`

Method: `GET`

Auth Required: Yes, must be logged in.

### Successful Response

Required Params: `{user_id}`

Code: `200 OK`

Example Response: 
```
[
    {
        "id": 2,
        "recipe_id": 1,
        "user_id": 1
    },
    {
        "id": 3,
        "recipe_id": 2,
        "user_id": 1
    }
]
```

## Add Favorite

URL: `/:user_id`

Method: `POST`

Auth Required: Yes, must be logged in.

### Successful Response

Required Params: `{user_id}`

Expected JSON request:
```
{
        "recipe_id": 1,
        "user_id": 1
}
```

Code: `201 Created`

Example Response:
```
{
    "id": 24,
    "recipe_id": 1,
    "user_id": 1
}
```

## Delete Favorite

URL: `/user_id/:favorite_id`

Method: `DELETE`

Auth Required: Yes, must be logged in and creator of record.

### Successful Response

Required Params: `{user_id}{favorite_id}`

Code: `204 No Content`

Example Response:
```
{}
```
