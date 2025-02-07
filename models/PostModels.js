const mongoose = require("mongoose");

const PostModel = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true}
}, { timestamps: true })

const model = mongoose.model("Posts", PostModel)

module.exports = model;