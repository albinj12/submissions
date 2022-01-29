const deliveryVehicleRepo = require('../repository/deliveryVehicle-repository')
const customerRepo = require('../repository/customer-repository')
const orderRepo = require('../repository/order-repository')
const itemRepo = require('../repository/item-repository')
const createInvoice = require('../utils/createInvoice')


module.exports = {
    createOrder: async (orderDetails) => {
        try {
            let availableVehicles = await deliveryVehicleRepo.checkVehicleAvailability(orderDetails.customerCity)

            if (availableVehicles.length === 0) {
                console.log(availableVehicles)
                throw new Error("No vehicles available")
            }
            if (orderDetails.customerId == "") {
                orderDetails.customerId = await customerRepo.createCustomer({ name: orderDetails.customerName, city: orderDetails.customerCity })
            }
            let item = await itemRepo.getItem(orderDetails.itemId)
            orderDetails.deliveryVehicleId = availableVehicles[0].registrationNumber
            orderDetails.price = item.price
            console.log(orderDetails)
            await orderRepo.createOrder(orderDetails)
        } catch (err) {
            throw err
        }

    },

    changeDeliveryStatus: async (id) => {
        try {
            let order = await orderRepo.getOrder(id)
            let customer = await customerRepo.getCustomer(order.customerId)
            let item = await itemRepo.getItem(order.itemId)
            orderDetails = {
                orderId: order.orderNumber,
                itemId: order.itemId,
                item: item.name,
                price: order.price,
                customerName: customer.name,
                customerCity: customer.city
            }
            let invoiceId = await createInvoice(orderDetails)
            await orderRepo.changeDeliveryStatus(id, invoiceId)
        } catch (err) {
            throw err
        }
    },

    getOrder: async (id) => {
        try {
            let order = await orderRepo.getOrder(id)
            return order
        } catch (err) {
            throw err
        }
    }
}