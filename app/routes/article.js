const express = require('express');
const router = express.Router();
const { Article } = require('../models/article');

// Create a new article
router.post('/', async (req, res) => {
    const article = new Article(req.body);
    try {
        await article.save();
        res.status(201).send(article);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        const processed_articles = [...articles].map((article) => {
            article.id = article._id ? (article._id.$oid ? article._id.$oid : article._id) : article.id;
            return article;
        })
        res.send(processed_articles);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

// Get a article by ID
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const article = await Article.findById(_id);
        if (!article) {
            return res.status(404).send();
        }
        res.send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a article by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "title",
        "subtitle",
        "author",
        "story_date",
        "section",
        "content",
        "images",
        "news",
        "site_link",
        "updated"
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send();
        }

        updates.forEach((update) => article[update] = req.body[update]);
        await article.save();
        res.send(article);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a article by ID
router.delete('/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);

        if (!article) {
            return res.status(404).send();
        }

        res.send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
