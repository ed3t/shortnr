"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    host: (_a = process.env.HOST) !== null && _a !== void 0 ? _a : 'localhost',
    port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : '5000',
    environment: (_c = process.env.NODE_ENV) !== null && _c !== void 0 ? _c : 'local',
    frontendUrl: process.env.FRONTEND_URL,
    frontendDomain: process.env.FRONTEND_DOMAIN,
    https: process.env.HTTPS === 'true',
    sslKey: process.env.SSL_KEY_PATH || './certs/key.pem',
    sslCert: process.env.SSL_CERT_PATH || './certs/cert.pem',
};
//# sourceMappingURL=config.js.map