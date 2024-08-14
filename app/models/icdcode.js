const mongoose = require('mongoose');

const icdcodeSchema = new mongoose.Schema({
    code: { type: String },
    name: { type: String },
    id: { type: String },
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
});

const ICDCode = mongoose.model("ICDCode", icdcodeSchema, "icdcodes")

module.exports = {
    ICDCode
};
