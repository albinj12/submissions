//model
const customerModel = require('../models/customer-model')

module.exports = {
    createCustomer: async (customer) => {
        try {
            let newCustomer = new customerModel
            newCustomer.name = customer.name
            newCustomer.city = customer.city
            console.log(newCustomer)
            await newCustomer.save()
            return newCustomer._id
        } catch (err) {
            throw err
        }
    },
    getCustomers: async () => {
        try {
            let customers = await customerModel.find({}).exec()
            return customers
        } catch (err) {
            throw err
        }
    },

    getCustomer: async (id) => {
        try {
            let customer = await customerModel.findById({ '_id': id }).exec()
            return customer
        } catch (err) {
            throw err
        }
    }

}