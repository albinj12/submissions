
const deliveryVehicleModel = require('../models/deliveryVehicle-model')

module.exports = {
    createDeliveryVehicle: async (deliveryVehicle) => {
        try {
            let newDeliveryVehicle = new deliveryVehicleModel
            newDeliveryVehicle.registrationNumber = deliveryVehicle.registrationNumber
            newDeliveryVehicle.vehicleType = deliveryVehicle.vehicleType
            newDeliveryVehicle.city = deliveryVehicle.city
            console.log(newDeliveryVehicle)
            await newDeliveryVehicle.save()
        } catch (err) {
            console.log("vehicle repo:", err)
            throw err
        }
    },
    checkVehicleAvailability: async (city) => {
        try {
            let availableVehicles = await deliveryVehicleModel.find({ city: city, activeOrdersCount: { $lt: 2 } }).exec()
            return availableVehicles
        } catch (err) {
            console.log("vehicle repo:", err)
        }
    },
    getDeliveryVehicles: async () => {
        try {
            let deliveryvehicles = await deliveryVehicleModel.find({}).exec()
            return deliveryvehicles
        } catch (err) {
            throw err
        }
    },
    getDeliveryVehicle: async (id) => {
        try {
            let deliveryvehicle = await deliveryVehicleModel.findById({ '_id': id }).exec()
            return deliveryvehicle
        } catch (err) {
            throw err
        }
    }

}