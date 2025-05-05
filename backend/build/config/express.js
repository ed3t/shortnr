"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const encode_1 = tslib_1.__importDefault(require("@app/routes/encode"));
const decode_1 = tslib_1.__importDefault(require("@app/routes/decode"));
const statistic_1 = tslib_1.__importDefault(require("@app/routes/statistic"));
const list_1 = tslib_1.__importDefault(require("@app/routes/list"));
const redirect_1 = tslib_1.__importDefault(require("@app/routes/redirect"));
const express_rate_limit_1 = tslib_1.__importDefault(require("express-rate-limit"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const config_1 = require("@config/config");
const createServer = () => {
    const app = (0, express_1.default)();
    const corsOptions = {
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    };
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 60 * 60 * 1000,
        max: 100,
        message: 'Too many requests. Try again later',
    });
    // Middleware
    app.use((0, cors_1.default)(corsOptions));
    app.use(limiter);
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    // Routes
    app.use('/api/encode', encode_1.default);
    app.use('/api/decode', decode_1.default);
    app.use('/api/statistic', statistic_1.default);
    app.use('/api/list', list_1.default);
    app.use('/:urlPath', redirect_1.default);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err, _req, res, _next) => {
        var _a, _b;
        const status = (_a = err.status) !== null && _a !== void 0 ? _a : 500;
        const message = (_b = err.message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
        res.status(status).json({
            success: false,
            status,
            message,
            stack: config_1.config.environment !== 'local' ? undefined : err.stack,
        });
    });
    app.disable('x-powered-by');
    return app;
};
exports.createServer = createServer;
//# sourceMappingURL=express.js.map