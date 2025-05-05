"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const encoder_1 = require("@app/controllers/encoder");
const url_1 = require("@app/models/url");
const config_1 = require("@config/config");
const utils_1 = require("@app/utils");
const error_1 = require("@app/utils/error");
const router = express_1.default.Router();
router.post('/', (req, res, next) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return next((0, error_1.createError)(400, "URL is required"));
    }
    let normalizedUrl;
    try {
        normalizedUrl = (0, utils_1.validateUrl)(longUrl);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return next((0, error_1.createError)(400, error.message));
    }
    const urlPath = (0, encoder_1.encodeUrl)(normalizedUrl);
    (0, url_1.saveUrl)(normalizedUrl, urlPath);
    const response = { longUrl: normalizedUrl, shortUrl: `${config_1.config.frontendDomain}/${urlPath}` };
    return res.json(response);
});
exports.default = router;
//# sourceMappingURL=encode.js.map