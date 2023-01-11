/*
 * @Description: 代理配置
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/zentao', {
      target: 'http://daisoft.duia.eu:38081/',
      changeOrigin: true,
    })
  );
};
