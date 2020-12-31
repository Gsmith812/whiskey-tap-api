# Comments

Used to retrieve all comments for a specific recipe and users can create, edit, and delete their own comments

BASE URL: `/comments`

## Get All Comments for Recipe

URL: `/:recipeId`

Method: `GET`

Auth Required: No

### Successful Response

Required Params: `{recipeId}`

Code: `200 OK`

Example Response: 
```
[
    {
        "id": 1,
        "content": "Test Comment stuff here",
        "date_created": "2020-12-16T02:34:45.740Z",
        "recipe_id": 1,
        "user_id": 3,
        "user_name": "Jason"
    },
    {
        "id": 2,
        "content": "Another comment really due?",
        "date_created": "2020-12-16T02:34:45.740Z",
        "recipe_id": 1,
        "user_id": 2,
        "user_name": "Jane"
    }
]
```

## Create New Comment

URL: `/:recipeId`

Method: `POST`

Auth Required: Yes, must be logged in.

### Successful Response

Required Params: `{recipeId}`

Example JSON Request:
```
{
        "content": "Test Comment stuff here",
        "date_created": "2020-12-16T02:34:45.740Z",
        "recipe_id": 1,
        "user_id": 3
}
```

Code: `201 Created`

Example Response:
```
{
    "id": 35,
    "content": "Test Comment stuff here",
    "date_created": "2020-12-16T02:34:45.740Z",
    "recipe_id": 1,
    "user_id": 3,
    "user_name": ""
}
```

## Delete Comment

URL: `/:recipeId/:commentId`

Method: `DELETE`

Auth Required: Yes, must be logged in and creator of specified comment.

### Successful Response

Required Params: `{recipeId}{commentId}`

Code: `204 No Content`

Example Response:
```
{}
```

## Delete Comment

URL: `/:recipeId/:commentId`

Method: `DELETE`

Auth Required: Yes, must be logged in and creator of specified comment.

### Successful Response

Required Params: `{recipeId}{commentId}`

Code: `204 No Content`

Example Response:
```
{}
```