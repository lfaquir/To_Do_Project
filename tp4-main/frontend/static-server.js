const fs = require('fs');
const http = require('http');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const contentType = mimeTypes[path.extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

http
  .createServer((req, res) => {
    const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, '');
    const filePath = path.join(buildDir, safePath === '/' ? 'index.html' : safePath);

    if (!filePath.startsWith(buildDir)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    fs.stat(filePath, (err, stat) => {
      if (!err && stat.isFile()) {
        sendFile(res, filePath);
        return;
      }

      sendFile(res, path.join(buildDir, 'index.html'));
    });
  })
  .listen(port, () => {
    console.log(`Frontend static server running on http://localhost:${port}`);
  });
