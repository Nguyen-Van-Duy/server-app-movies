// const newsRouter = require('./news');
import conversation from './Conversations.js';
import message from './messages.js';
import user from './Users.js';
import movie from './Movies.js';
import express from 'express';

let router = express.Router();

function route(app) {
    router.use('/conversation', conversation);
    router.use('/message', message);
    router.use('/account', user);
    router.use('/film', movie);
    return app.use('/api-movie/', router)
}

export default route;