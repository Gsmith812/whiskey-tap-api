# Whiskey Tap API

This is the back-end express application that connects and feeds data into the client-side app. A live version of the app can be found at [https://whiskey-tap.vercel.app](https://whiskey-tap.vercel.app)

## Set up

Complete the following steps to set-up the API:

1. Clone this repository to your local machine `git clone whiskey-tap-api`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Change the `.env` variables to reflect your personal environment

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When you are ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

## API Documentation

- BASE URL for all endpoints: [http://localhost:8000/api](http://localhost:8000/api) or deployed server URL.

### Recipes

- [Get All Recipes](api-docs/recipes.md#get-all-recipes): `GET /recipes`
- [Create New Recipe](api-docs/recipes.md#create-new-recipe): `POST /recipes` (*Must be logged in*)
- [Get Recipe by ID](api-docs/recipes.md#get-recipe-by-id): `GET /recipes/:recipeId`
- [Delete a Recipe](api-docs/recipes.md#delete-a-recipe): `DELETE /recipes/:recipeId` (*Must be logged in and Owner of recipe*)
- [Edit a Recipe](api-docs/recipes.md#edit-a-recipe): `PATCH /recipes/:recipeId` (*Must be logged in and creator of recipe*)

### Users

- [Create New User](api-docs/users.md#create-new-user): `POST /users/create`
- [Login](api-docs/users.md#login): `POST /users/login`

### Comments

- [Get All Comments for Recipe](api-docs/comments.md#get-all-comments-for-recipe): `GET /comments/:recipeId`
- [Create New Comment](api-docs/comments.md#create-new-comment): `POST /comments/:recipeId` (*Must be logged in*)
- [Delete Comment](api-docs/comments.md#delete-comment): `DELETE /comments/:recipeId/:commentId` (*Must be logged in and creator of comment*)
- [Edit Comment](api-docs/comments.md#edit-comment): `PATCH /comments/:recipeId/:commentId` (*Must be logged in and creator of comment*)

### Favorites

- [Get User's Favorite Recipes](api-docs/favorites.md): `GET /favorites/:user_id` (*Must be logged in*)
- [Add Favorite](api-docs/favorites.md#add-favorite): `POST /favorites/:user_id` (*Must be logged in and user_id matches*)
- [Delete Favorite](api-docs/favorites.md#delete-favorite): `DELETE /favorites/:user_id` (*Must be logged in and user_id matches*)

