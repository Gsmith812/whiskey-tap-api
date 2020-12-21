function makeCommentsArray() {
    const testComments = [
        {
            "id": 1,
            "content": "Test Comment stuff here",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 1,
            "user_id": 3,
        },
        {
            "id": 2,
            "content": "Another comment really due?",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 1,
            "user_id": 2
        },
        {
            "id": 3,
            "content": "Hello Commenters",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 2,
            "user_id": 4
        },
        {
            "id": 4,
            "content": "Hello Everyone",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 2,
            "user_id": 3
        },
        {
            "id": 5,
            "content": "Who are you?",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 2,
            "user_id": 5
        },
        {
            "id": 6,
            "content": "Hello World",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 3,
            "user_id": 1
        }
    ]

    const expectedComments = [
        {
            "id": 4,
            "content": "Hello Everyone",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 2,
            "user_id": 3,
            "user_name": "Jason"
        },
        {
            "id": 3,
            "content": "Hello Commenters",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 2,
            "user_id": 4,
            "user_name": "Michelle"
        },
        {
            "id": 5,
            "content": "Who are you?",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 2,
            "user_id": 5,
            "user_name": "Louis"
        }
    ]

    const newComment = {
        "id": 1,
        "content": "Who are you?",
        "date_created": "2020-12-07T22:10:14.920Z",
        "recipe_id": 2,
        "user_id": 5,
        "user_name": "Louis"
    }

    return {
        testComments,
        expectedComments,
        newComment
    }
}

module.exports = {
    makeCommentsArray,
}