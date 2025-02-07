const express = require("express")
const router = express.Router();
const Model = require("../models/PostModels")

router.post("/create", async (req, res) => {
    try {
        const post = await Model.create(req.body)
        res.status(201).send(post);

    } catch (error) {
        console.error(error);
        res.status(500).send({ Message: "500 - Error en la Solicitud" });
    }
})

router.get("/", async (req, res) => {
    try {
        const post = await Model.find()
        res.status(200).send(post);

    } catch (error) {
        console.error(error);
        res.status(500).send({ Message: "500 - Error en la Solicitud" });
    }
})

router.get("/id/:_id", async (req, res) => {
    try {
        const postID = await Model.findById(req.params._id)
        res.status(200).send(postID);

        if (!postID) {
            return res.status(404).send({ Message: "ID no encontrado" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ Message: "500 - Error en la Solicitud" });
    }
})

router.get("/title/:title", async (req, res) => {
    try {
        const decodedTitle = decodeURIComponent(req.params.title);
        const postTitle = await Model.findOne({ title: decodedTitle });

        if (!postTitle) {
            return res.status(404).send({ Message: "Post no encontrado" });
        }

        res.status(200).send(postTitle);

    } catch (error) {
        console.error(error);
        res.status(500).send({ Message: "500 - Error en la Solicitud" });
    }
})

router.put("/id/:_id", async (req, res) => {
    try {
        const updatePost = await Model.findByIdAndUpdate(req.params._id, req.body, { new: true })
        res.status(200).send(updatePost);

        if (!updatePost) {
            return res.status(404).send({ Message: "No Se Pudo Actualizar" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ Message: "500 - Error en la Solicitud" });
    }
})

router.delete("/id/:_id", async (req, res) => {
    try {
        const updatePost = await Model.findByIdAndDelete(req.params._id)
        res.status(200).send(updatePost);

    } catch (error) {
        console.error(error);
        res.status(500).send({ Message: "500 - Error en la Solicitud" });
    }
})

module.exports = router; 