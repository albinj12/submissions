const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, prettyPrint, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat,
        prettyPrint(),
        colorize({
            all: true
        })
    ),
    transports: [new transports.Console()]
});

module.exports = logger
