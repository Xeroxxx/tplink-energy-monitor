// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line func-names
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        }),
    );
    app.use(
        '/socket.io',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        }),
    );
};
