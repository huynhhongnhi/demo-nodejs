/**
 * Configurations of logger.
 */
 const { format, createLogger, transports } = require("winston");
 const { combine, timestamp, label, printf, prettyPrint } = format;
 const CATEGORY = "winston custom format";
 
 const logger = createLogger({
   level: "debug",
   format: combine(
     label({ label: CATEGORY }),
     timestamp({
       format: "MMM-DD-YYYY HH:mm:ss",
     }),
     prettyPrint()
   ),
   transports: [
     new transports.File({
      level: "debug",
       filename: "logs/example.log",
     }),
     new transports.File({
       level: "error",
       filename: "logs/error.log",
       formatter: options => `[${options.timestamp()}]: ${options.message || ''}`,
       json: false
     }),
     new transports.Console(
       {
        level: 'error',
        name: 'error-console',
        colorize: true,
        timestamp: () => moment().format('YYYY-MM-DD HH-mm-ss'),
        formatter: options => `[${options.timestamp()}]: ${options.message || ''}`
       }
     ),
   ],
 });
 
 module.exports = logger;