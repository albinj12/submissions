const itemRepository = require('../repository/item-repository')

module.exports = {
    createItem: async (item) => {
        try {
            if (item.name == "" || item.price == "") {
                throw new Error('Incomplete details')
            }
            await itemRepository.createItem(item)
        } catch (err) {
            throw err
        }

    },
    getItems: async () => {
        try {
            let items = await itemRepository.getItems()
            return items
        } catch (err) {
            throw err
        }
    },

    updateItem: async (id, item) => {
        try {
            if (item.name != "" || item.price != "") {
                await itemRepository.updateItem(id, item)
            } else {
                throw new Error("Nothing to update")
            }
        } catch (err) {
            throw err
        }
    },

    getItem: async (id) => {
        try {
            let item = await itemRepository.getItem(id)
            return item
        } catch (err) {
            throw err
        }
    }
}