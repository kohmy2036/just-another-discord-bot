const winston = require('winston');
const path = require('path');// eslint-disable-line no-unused-vars
const fs = require('fs'); // eslint-disable-line no-unused-vars

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



exports.loggingM = function log(lContent) {
    logger.info(lContent);
};