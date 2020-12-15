const path = require('path');
const express = require('express');
const xss = require('xss');
const CommentsService = require('./comments-service');

const commentsRouter = express.Router();
const jsonParser = express.json();

const serializeComment = comment => ({
    id: comment.id,
    content: xss(comment.content),
    date_created: comment.date_created,
    recipe_id: comment.recipe_id,
    user_id: comment.user_id,
    user_name: xss(comment.user_name)
})

commentsRouter
    .route('/:recipeId')
    .get((req, res, next) => {
        CommentsService.getCommentByRecipeId(
            req.app.get('db'),
            req.params.recipeId
        )
            .then(comments => {
                res.json(comments.map(serializeComment))
            })
            .catch(next);
    })
    .post(jsonParser, (req, res, next) => {
        const { content, date_created, recipe_id, user_id, user_name } = req.body;
        const newComment = { content, recipe_id, user_id };

        for(const [key, value] of Object.entries(newComment)) {
            if(value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        newComment.date_created = date_created;

        CommentsService.insertNewComment(
            req.app.get('db'),
            newComment
        )
            .then(comment => {
                comment.user_name = user_name;
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${comment.id}`))
                    .json(serializeComment(comment))
            })
            .catch(next);

    });

commentsRouter
    .route('/:recipeId/:commentId')
    .all((req, res, next) => {
        CommentsService.getCommentByCommentId(
            req.app.get('db'),
            req.params.commentId
        )
            .then(comment => {
                if(!comment) {
                    return res.status(404).json({
                        error: { message: `Comment doesn't exist` }
                    })
                }
                res.comment = comment;
                next();
            })
    })
    .delete((req, res, next) => {
        CommentsService.deleteComment(
            req.app.get('db'),
            req.params.commentId
        )
            .then(numRowsAffected => {
                res.status(204).end();
            })
            .catch(next);
    })

module.exports = commentsRouter;