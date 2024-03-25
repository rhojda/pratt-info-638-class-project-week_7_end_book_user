const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');


router.get('/edit', async (req, res, next) => {
    let bookId = req.query.id;
    let author = Author.get(authorIndex);
    res.render('books/form', { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex });
});

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    let bookId = req.body.bookId;
    redirect = `/books/show/${bookId}`;
    Comment.upsert(req.body);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'Your comment has been added',
    };
    res.redirect(303, redirect)
});

module.exports = router;