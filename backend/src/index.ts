import * as moduleAlias from 'module-alias';
const sourcePath = process.env.NODE_ENV !== 'local' ? 'build' : 'src';
moduleAlias.addAliases({
  '@app': sourcePath,
  '@config': `${sourcePath}/config`,
  '@tests': `${sourcePath}/__tests__`,
});

import fs from 'fs';
import { AddressInfo } from 'net';
import http from 'http';
import https from 'https';
import { config } from '@config/config';
import { createServer } from '@config/express';

async function startServer() {
  const app = createServer();
  let server: http.Server | https.Server;
  if (config.https && config.sslKey && config.sslCert) {
    const sslOptions = {
      key: fs.readFileSync(config.sslKey),
      cert: fs.readFileSync(config.sslCert),
    };

    server = https.createServer(sslOptions, app).listen({ host: config.host, port: config.port }, () => {
      const addressInfo = server.address() as AddressInfo;
      console.log(`https server ready at https://${addressInfo.address}:${addressInfo.port}`);
    });
  } else {
    server = http.createServer(app).listen({ host: config.host, port: config.port }, () => {
      const addressInfo = server.address() as AddressInfo;
      console.log(`http server ready at http://${addressInfo.address}:${addressInfo.port}`);
    });
  }

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      console.log(`process.once ${type}`);

      server.close(() => {
        console.log('HTTP server closed');
      });
    });
  });
}

startServer();
