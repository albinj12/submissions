//model
const mongoose = require('mongoose')
const itemModel = require('../models/item-model')

module.exports = {
    createItem: async (item) => {
        try {
            let newItem = new itemModel
            newItem.name = item.name
            newItem.price = item.price
            console.log(newItem)
            await newItem.save()
        } catch (err) {
            throw err
        }
    },
    getItems: async () => {
        try {
            let items = await itemModel.find({}).exec()
            return items
        } catch (err) {
            throw err
        }
    },

    updateItem: async (id, item) => {
        const session = await mongoose.startSession();
        try {
            session.startTransaction()

            if (item.name != "") {
                await itemModel.findByIdAndUpdate({ '_id': id }, { name: item.name }, { session })
            }

            if (item.price != "") {
                await itemModel.findByIdAndUpdate({ '_id': id }, { price: item.price }, { session })
            }

            await session.commitTransaction()
        } catch (err) {
            await session.abortTransaction();
            throw err
        }
        session.endSession();
    },
    getItem: async (itemId) => {
        try {
            let item = await itemModel.findById({ "_id": itemId })
            return item
        } catch (err) {
            throw err
        }
    }
}