const logger = (req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const duration =
      Number(process.hrtime.bigint() - start) / 1_000_000;

    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent") || "Unknown";

    let statusColor;

    if (status >= 500) {
      statusColor = "\x1b[31m"; // Red
    } else if (status >= 400) {
      statusColor = "\x1b[33m"; // Yellow
    } else if (status >= 300) {
      statusColor = "\x1b[36m"; // Cyan
    } else {
      statusColor = "\x1b[32m"; // Green
    }
    console.log(
      `[${timestamp}] ${method} ${url} | ` +
      `${statusColor}${status}\x1b[0m | ` +
      `${duration.toFixed(2)}ms | ` +
      `IP: ${ip} | ` +
      `UA: ${userAgent}`
    );
  });

  next();
};

module.exports = logger;