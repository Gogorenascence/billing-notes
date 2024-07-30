const mongoose = require('mongoose');


const articleImageSchema = new mongoose.Schema({
    src: { type: String },
    caption: { type: String },
    link: { type: String },
    order: { type: Number },
    alt_text: { type: String },
}, { _id: false });

const articleSchema = new mongoose.Schema(
    {
        title: { type: String },
        subtitle: { type: String },
        author: { type: String },
        story_date: { type: String },
        updated: { type: String },
        section: { type: String },
        content: { type: String },
        images: {
            type: Map,
            of: [articleImageSchema]
        },
        news: { type: Boolean },
        site_link: { type: String },
        id: { type: String },
        _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
    }
);

const Article = mongoose.model("Article", articleSchema, "articles")

module.exports = {
    Article
};
