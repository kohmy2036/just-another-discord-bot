const winston = require('winston');

var exports = module.exports = {};


const logger = winston.createLogger({
    level: 'info' ,
    format: winston.format.combine(
        winston.format.timestamp(), 
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level} ${info.message}`;
        })),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: './bot.log'})
    ]
});



exports.loggingM =async function log(lContent) {
    await logger.info(lContent);
};