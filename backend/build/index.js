"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moduleAlias = tslib_1.__importStar(require("module-alias"));
const sourcePath = process.env.NODE_ENV !== 'local' ? 'build' : 'src';
moduleAlias.addAliases({
    '@app': sourcePath,
    '@config': `${sourcePath}/config`,
    '@tests': `${sourcePath}/__tests__`,
});
const fs_1 = tslib_1.__importDefault(require("fs"));
const http_1 = tslib_1.__importDefault(require("http"));
const https_1 = tslib_1.__importDefault(require("https"));
const config_1 = require("@config/config");
const express_1 = require("@config/express");
const logger_1 = require("@config/logger");
function startServer() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.createServer)();
        let server;
        if (config_1.config.https && config_1.config.sslKey && config_1.config.sslCert) {
            const sslOptions = {
                key: fs_1.default.readFileSync(config_1.config.sslKey),
                cert: fs_1.default.readFileSync(config_1.config.sslCert),
            };
            server = https_1.default.createServer(sslOptions, app).listen({ host: config_1.config.host, port: config_1.config.port }, () => {
                const addressInfo = server.address();
                logger_1.logger.info(`https server ready at https://${addressInfo.address}:${addressInfo.port}`);
            });
        }
        else {
            server = http_1.default.createServer(app).listen({ host: config_1.config.host, port: config_1.config.port }, () => {
                const addressInfo = server.address();
                logger_1.logger.info(`http server ready at http://${addressInfo.address}:${addressInfo.port}`);
            });
        }
        const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
        signalTraps.forEach((type) => {
            process.once(type, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                logger_1.logger.info(`process.once ${type}`);
                server.close(() => {
                    logger_1.logger.debug('HTTP server closed');
                });
            }));
        });
    });
}
startServer();
//# sourceMappingURL=index.js.map