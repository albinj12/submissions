const express = require('express');
const router = express.Router();
const logger = require('../winston')
const parseJson = express.json({ extended: false })

const orderService = require('../service/order-service')

router
    .route('/')
    .post([parseJson], async (req, res) => {
        try {
            await orderService.createOrder(req.body)
            res.status(201).send()
        } catch (err) {
            logger.error(err.stack)
            if (err.message.includes("No vehicles available")) {
                res.status(200).json({ message: "No vehicles available" })
            } else {
                res.status(500).json({ error: "Failed to create order" })
            }

        }
    })

router
    .route('/:id/status')
    .put(async (req, res) => {
        try {
            if (req.params.id != "") {
                await orderService.changeDeliveryStatus(req.params.id)
                res.status(200).json({ message: "Order status change to delivered" })
            } else {
                throw new Error("Invalid id")
            }
        } catch (err) {
            logger.error(err.stack)
            if (err.message.includes("Invalid id")) {
                res.status(400).json({ error: "invalid id" })
            } else {
                res.status(500).json({ error: "Failed to change delivery status" })
            }
        }
    })
router
    .route('/:id')
    .get(async (req, res) => {
        try {
            if (req.params.id != "") {
                let order = await orderService.getOrder(req.params.id)
                res.status(200).json({ "order": order })
            } else {
                throw new Error("Invalid id")
            }
        } catch (err) {
            logger.error(err.stack)
            if (err.message.includes("Invalid id")) {
                res.status(400).json({ error: "invalid id" })
            } else {
                res.status(500).json({ error: "Failed to get order" })
            }
        }
    })
module.exports = router