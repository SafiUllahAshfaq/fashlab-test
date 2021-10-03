import winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: isProd ? 'error' : 'debug',
    }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  ],
};

const logger = winston.createLogger(options);

if (!isProd) {
  logger.debug('Logging initialized at debug level');
}

export default logger;
