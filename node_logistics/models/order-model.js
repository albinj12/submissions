const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "orderIdCounter"
    },
    sequence: {
        type: Number,
        default: 0000
    }
})

let counter = mongoose.model('counter', counterSchema);

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    deliveryVehicleId: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    invoiceId: {
        type: String
    }
})

orderSchema.pre('validate', function (next) {
    console.log("here in pre save hook")
    var order = this
    counter.findOneAndUpdate({ "name": "orderIdCounter" }, { "$inc": { "sequence": 1 } }, { new: true, upsert: true }, (error, doc) => {
        if (error) {
            return next(error)
        } else {
            order.orderNumber = doc.sequence
            next()
        }
    })
})

module.exports = mongoose.model('Order', orderSchema)