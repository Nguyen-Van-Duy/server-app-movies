// const newsRouter = require('./news');
import conversation from './Conversations.js';
import message from './messages.js';
import user from './Users.js';
import movie from './Movies.js';
import profileUser from './ProfileUser.js';
import uploadMovie from './UploadMovie.js';
import comment from './Comments.js';
import feedback from './Feedbacks.js';
import express from 'express';

let router = express.Router();

function route(app) {
    router.use('/conversation', conversation);
    router.use('/message', message);
    router.use('/account', user);
    router.use('/movie', movie);
    router.use('/profile', profileUser);
    router.use('/upload', uploadMovie)
    router.use('/comment', comment)
    router.use('/feedback', feedback)
    return app.use('/api-movie/', router)
}

export default route;