const express = require('express');
const router = express.Router();
const logger = require('../winston')
const parseJson = express.json({ extended: false })

const deliveryVehicleService = require('../service/deliveryVehicle-service')

router
    .route('/')
    .post([parseJson], async (req, res) => {
        try {
            await deliveryVehicleService.createDeliveryVehicle(req.body)
            res.status(201).send()
        } catch (err) {
            logger.error(err.stack)
            if (err.message.includes("is required")) {
                res.status(400).send({ error: err.message })
            } else if (err.code === 11000) {
                res.status(400).send({ error: "Vehicle with given registration number is already registered" })
            } else {
                res.status(500).json({ error: "Failed to save vehicle details" })
            }

        }
    })
    .get(async (req, res) => {
        try {
            let items = await deliveryVehicleService.getDeliveryVehicles()
            res.status(200).send({ items })
        } catch (err) {
            logger.error(err.stack)
            res.status(500).json({ error: "Failed to get vehicle details" })
        }
    })

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            if (req.params.id != "") {
                let deliveryVehicle = await deliveryVehicleService.getDeliveryVehicle(req.params.id)
                res.status(200).send({ "deliveryVehicle": deliveryVehicle })
            } else {
                throw new Error("Invalid id")
            }
        } catch (err) {
            logger.error(err.stack)
            res.status(500).json({ error: "Failed to get vehicle detail" })
        }

    })

module.exports = router