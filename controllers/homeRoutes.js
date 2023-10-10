const { User, Post, Comment } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'text', 'user_id'],
                    include: [{
                        model: User,
                        attributes: ['username']
                    }]
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })

        const post = postData.get({ plain: true });
        res.render('post', {
            ...post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;