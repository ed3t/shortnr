import dotenv from 'dotenv';

dotenv.config();

export const config = {
  host: process.env.HOST ?? 'localhost',
  port: process.env.PORT ?? '9002',
  environment: process.env.NODE_ENV ?? 'local',
  frontendUrl: process.env.FRONTEND_URL,
  frontendDomain: process.env.FRONTEND_DOMAIN,
  https: process.env.HTTPS === 'true',
  sslKey: process.env.SSL_KEY_PATH || './certs/key.pem',
  sslCert: process.env.SSL_CERT_PATH || './certs/cert.pem',
};
