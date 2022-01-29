const express = require('express');
const router = express.Router();
const logger = require('../winston')
const parseJson = express.json({ extended: false })

const itemService = require('../service/item-service')

router
    .route('/')
    .post([parseJson], async (req, res) => {
        try {
            await itemService.createItem(req.body)
            res.status(201).send()
        } catch (err) {
            logger.error(err.stack)
            if (err.message.includes("Incomplete details") || err.message.includes("Item validation failed")) {
                res.status(400).json({ error: "Bad request" })
            } else {
                res.status(500).json({ error: "Failed to save item" })
            }

        }
    })
    .get(async (req, res) => {
        try {
            let items = await itemService.getItems()
            res.status(200).send({ items })
        } catch (err) {
            logger.error(err.stack)
            res.status(500).json({ error: "Failed to get items" })
        }
    })

router
    .route('/:id')
    .put([parseJson], async (req, res) => {
        try {
            if (req.params.id != "") {
                await itemService.updateItem(req.params.id, req.body)
                res.status(201).send()
            } else {
                throw new Error("Invalid id")
            }
        } catch (err) {
            logger.error(err.stack)
            if (err.message.includes("Invalid id") || err.message.includes("Nothing to update")) {
                res.status(400).json({ error: "Bad request" })
            } else {
                res.status(500).json({ error: "Failed to update item" })
            }
        }
    })
    .get(async (req, res) => {
        try {
            if (req.params.id != "") {
                let item = await itemService.getItem(req.params.id)
                res.status(200).send({ "item": item })
            } else {
                throw new Error("Invalid id")
            }
        } catch (err) {
            logger.error(err.stack)
            if (err.message.includes("Invalid id")) {
                res.status(400).json({ error: "invalid id" })
            } else {
                res.status(500).json({ error: "Failed to get item" })
            }
        }
    })

module.exports = router