

const orderModel = require('../models/order-model')
const deliveryVehicleModel = require('../models/deliveryVehicle-model')
const mongoose = require('mongoose')

module.exports = {
    createOrder: async (orderDetails) => {
        const session = await mongoose.startSession()
        session.startTransaction();
        try {
            let newOrder = new orderModel
            newOrder.itemId = orderDetails.itemId
            newOrder.price = orderDetails.price
            newOrder.customerId = orderDetails.customerId
            newOrder.deliveryVehicleId = orderDetails.deliveryVehicleId
            newOrder.location = orderDetails.customerCity
            await deliveryVehicleModel.findOneAndUpdate({ registrationNumber: orderDetails.deliveryVehicleId }, { "$inc": { activeOrdersCount: 1 } }, { session })
            await newOrder.save({ session })
            await session.commitTransaction()
            session.endSession();
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err

        }
    },

    changeDeliveryStatus: async (id, invoiceId) => {
        const session = await mongoose.startSession()
        session.startTransaction();
        try {
            let deliveredOrder = await orderModel.findOneAndUpdate({ 'orderNumber': id }, { isDelivered: true, invoiceId: invoiceId }, { new: true, session })
            await deliveryVehicleModel.findOneAndUpdate({ registrationNumber: deliveredOrder.deliveryVehicleId }, { "$inc": { activeOrdersCount: -1 } }, { session })
            await session.commitTransaction()
            session.endSession();
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err
        }
    },

    getOrder: async (id) => {
        try {
            let order = orderModel.findOne({ "orderNumber": id })
            return order
        } catch (err) {
            throw err
        }

    }

}