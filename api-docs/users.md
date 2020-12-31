# Users

Used to create new users and login existing user accounts

BASE URL: `/users`

## Create New User

URL: `/create`

Method: `POST`

Auth Required: No

### Successful Response

Example JSON request:
```
{
    "first_name": "Demo",
    "last_name": "Demo",
    "email": "demo@demo.com",
    "password": "demo",
    "date_of_birth": "1999-11-22"
}
```

Code: `201 Created`

Example Response:
```
{
    "id": 19,
    "first_name": "Demo",
    "last_name": "Demo",
    "email": "demo@demo.com",
    "date_of_birth": "1999-11-22T05:00:00.000Z",
    "date_created": "2020-12-31T02:21:03.826Z"
}
```

## Login

URL: `/login`

Method: `POST`

Auth Required: No

### Successful Response

Example JSON request: 
```
{
    "email": "demo@demo.com",
    "password": "demo"
}
```

Code: `200 OK`

Example Response:
```
{
    "id": 19,
    "userName": "Demo"
}
```