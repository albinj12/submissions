const express = require('express');
const initializeDB = require('./db/mongo')
const logger = require('./winston');
const morgan = require('morgan')
const verifyToken = require('./middleware/verifyToken')
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger/openapi.json');

initializeDB()
const app = express();

app.use(morgan("short"))

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(verifyToken)


const itemRouter = require('./routes/item-router')
const deliveryVehicleRouter = require('./routes/deliveryVehicle-router')
const customerRouter = require('./routes/customer-router')
const orderRouter = require('./routes/order-router')

app.use('/items', itemRouter)
app.use('/deliveryvehicles', deliveryVehicleRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)

app.listen(3000, () => {
    logger.info('App started on port 3000')
})
