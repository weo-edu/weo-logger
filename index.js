var winston = require('winston');
require('winston-papertrail').Papertrail;

module.exports = function(appName) {
  var logger = new winston.Logger({
    transports: [
      new winston.transports.Papertrail({
          host: process.env.PAPERTRAIL_HOST,
          port: process.env.PAPERTRAIL_PORT,
          handleExceptions: true,
          colorize: true,
          program: appName
      })
    ]
  });

  var write = process.stdout.write;

  process.stdout.write = function(data) {
    logger.info(data);
    return write.apply(this, arguments);
  };

  process.stderr.write = function(data) {
    logger.error(data);
    return write.apply(this, arguments);
  };

  return logger;
};