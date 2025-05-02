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
import { config } from '@config/config';
import { createServer } from '@config/express';

async function startServer() {
  const app = createServer();
  const server = http.createServer(app).listen({host, port}, () => {
    const addressInfo = server.address() as AddressInfo;
    logger.info(
      `Server ready at http://${addressInfo.address}:${addressInfo.port}`,
    );
  });

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
