const customerRepo = require('../repository/customer-repository')

function validateCustomerDetails(customer) {
    if (customer.name == "") {
        throw new Error("customer name is required")
    }
    if (customer.city == "") {
        throw new Error("customer city is required")
    }
}


module.exports = {
    createCustomer: async (customer) => {
        try {
            validateCustomerDetails(customer)
            await customerRepo.createCustomer(customer)
        } catch (err) {
            throw err
        }

    },

    getCustomers: async () => {
        try {
            let customers = await customerRepo.getCustomers()
            return customers
        } catch (err) {
            throw err
        }
    },

    getCustomer: async (id) => {
        try {
            let customer = await customerRepo.getCustomer(id)
            return customer
        } catch (err) {
            throw err
        }
    }
}