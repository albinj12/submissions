const jwt = require('jsonwebtoken');
const logger = require('../winston')

module.exports = function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"]
    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        jwt.verify(token, "privatekey");
    } catch (err) {
        logger.error(err)
        return res.status(401).send("Unauthorized");
    }
    return next();
}