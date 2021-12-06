const { createLogger, transports, format } = require("winston");
const event = createLogger({
  transports: [
    new transports.File({
      filename: "logs/event.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = { event };
