const express = require('express');
const path = require('path');
const FavoritesService = require('./favorites-service');

const favoritesRouter = express.Router();
const jsonParser = express.json();

favoritesRouter
    .route('/:user_id')
    .get((req, res, next) => {
        const { user_id } = req.params;

        FavoritesService.getFavoritesByUser(
            req.app.get('db'),
            user_id
        )
            .then(favorites => {
                return res.json(favorites)
            })
            .catch(next);
    })
    .post(jsonParser, (req, res, next) => {
        const { recipe_id, user_id } = req.body;
        const newFavorite = { recipe_id, user_id };

        for(const [key, value] of Object.entries(newFavorite)) {
            if(!value) {
                res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }
        FavoritesService.insertFavorite(
            req.app.get('db'),
            newFavorite
        )
            .then(fav => 
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl) + `/${fav.id}`)
                    .json(fav)
            )
            .catch(next);
    })

favoritesRouter
    .route('/:user_id/:favorite_id')
    .all((req, res, next) => {
        FavoritesService.getFavoritesByFavId(
            req.app.get('db'),
            req.params.favorite_id
        )
            .then(fav => {
                if(!fav) {
                    return res.status(404).json({
                        error: { message: `Favorite record does not exist` }
                    })
                }
                if(fav.user_id !== parseInt(req.params.user_id)) {
                    return res.status(400).json({
                        error: { message: `User is not authorized to delete this record`}
                    })
                }
                res.favorite = fav
                next();
            })
            .catch(next);
    })
    .delete((req, res, next) => {
        FavoritesService.deleteFavorite(
            req.app.get('db'),
            req.params.favorite_id
        )
            .then(numRowsAffected => res.status(204).end())
            .catch(next);
    });

module.exports = favoritesRouter;