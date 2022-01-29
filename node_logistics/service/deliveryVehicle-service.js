const deliveryVehicleRepo = require('../repository/deliveryVehicle-repository')

function validateVehicleDetails(deliveryVehicle) {
    if (deliveryVehicle.registrationNumber == "") {
        throw new Error("registrationNumber is required")
    }
    if (deliveryVehicle.vehicleType == "") {
        throw new Error("vehicleType is required")
    }
    if (deliveryVehicle.city == "") {
        throw new Error("city is required")
    }
}


module.exports = {
    createDeliveryVehicle: async (deliveryVehicle) => {
        try {
            validateVehicleDetails(deliveryVehicle)
            await deliveryVehicleRepo.createDeliveryVehicle(deliveryVehicle)
        } catch (err) {
            throw err
        }

    },

    getDeliveryVehicles: async () => {
        try {
            let deliveryVehicles = await deliveryVehicleRepo.getDeliveryVehicles()
            return deliveryVehicles
        } catch (err) {
            throw err
        }

    },
    getDeliveryVehicle: async (id) => {
        try {
            let deliveryVehicle = await deliveryVehicleRepo.getDeliveryVehicle(id)
            return deliveryVehicle
        } catch (err) {
            throw err
        }

    }
}