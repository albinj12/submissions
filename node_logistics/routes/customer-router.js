const express = require('express');
const router = express.Router();
const logger = require('../winston')
const parseJson = express.json({ extended: false })

const customerService = require('../service/customer-service')

router
    .route('/')
    .post([parseJson], async (req, res) => {
        try {
            await customerService.createCustomer(req.body)
            res.status(201).send()
        } catch (err) {
            logger.error(err.stack)
            if (err.message.includes("is required")) {
                res.status(400).json({ error: "Bad Request" })
            } else {
                res.status(500).json({ error: "Failed to save customer details" })
            }

        }
    })

    .get(async (req, res) => {
        try {
            let customers = await customerService.getCustomers()
            res.status(200).send({ "customers": customers })
        } catch (err) {
            logger.error(err.stack)
            res.status(500).json({ error: "Failed to get customer details" })
        }

    })

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            if (req.params.id != "") {
                let customer = await customerService.getCustomer(req.params.id)
                res.status(200).send({ "customer": customer })
            } else {
                throw new Error("Invalid id")
            }
        } catch (err) {
            logger.error(err.stack)
            if (err.message.includes("Invalid id")) {
                res.status(400).json({ error: "invalid id" })
            } else {
                res.status(500).json({ error: "Failed to get customer" })
            }
        }
    })



module.exports = router