const argv = process.argv;

const portArg = argv.filter(arg => arg.indexOf('--port') > -1);
let port;

if (portArg[0]) {
  port = portArg[0].split('=')[1];
} else {
  port = 4200;
}

module.exports = {
  "**/api/**": {
    target: "http://buddy.hse.ru",
    changeOrigin: true,
    secure: false,
    toProxy: true,
    onProxyReq(proxyReq, req, res) {
      proxyReq.setHeader('x-added', 'localhost:' + port);
    }
  }
};
