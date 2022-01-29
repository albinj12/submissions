const mongoose = require('mongoose');
const logger = require('../winston')

module.exports = function initializeDB() {
    // connect to mongodb atlas
    // mongodb transactions are used in this project
    // transactions will work only on mongodb replica set
    mongoose.connect("mongodb replica set uri", {
        useNewUrlParser: true, useUnifiedTopology: true
    });

    var db = mongoose.connection;

    // check connection
    db.on('open', () => {
        logger.info('Connected to db')
    });

    // check for db error
    db.on('error', (err) => {
        logger.error(err.message)
    });
}


