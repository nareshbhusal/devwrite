const app = require('./index');
const fs = require('fs');
const path = require('path');
const https = require('https');

const { PORT, SECURE } = process.env;

const port = PORT || 5000;
const certPath = path.join(__dirname, '../src/certs');

if (SECURE) {
    const key = fs.readFileSync(certPath + '/selfsigned.key');
    const cert = fs.readFileSync(certPath + '/selfsigned.crt');
    const options = {
        key,
        cert
    }
    const server = https.createServer(options, app);

    server.listen(port, () => {
        console.log(`secure server listening on port ${port}`);
    });
} else {
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}