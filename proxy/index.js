const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
var cors = require('cors')

// Create Express Server
const app = express();
app.use(cors())
app.disable('etag');


// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://demo.spreecommerce.org/api/v2/storefront";
// Logging
app.use(morgan('dev'));
// Info GET endpoint
app.get('/info', (req, res, next) => {
  res.send('This is a proxy service which proxies to Billing and Account APIs.');
});
// Authorization
app.use('', (req, res, next) => {
  if (req.headers.authorization) {
      next();
  } else {
      res.sendStatus(403);
  }
});
// Proxy endpoints
app.use('/api', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
      [`^/api`]: '',
  },
}));
// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
