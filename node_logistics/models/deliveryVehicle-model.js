const mongoose = require('mongoose');

const deliveryVehicleSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        unique: true,
        required: true
    },
    vehicleType: {
        type: String,
        enum: ['bike', 'truck'],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    activeOrdersCount: {
        type: Number,
        default: 0,
        min: 0,
        max: 2
    }
})

module.exports = mongoose.model('DeliveryVehicle', deliveryVehicleSchema)
