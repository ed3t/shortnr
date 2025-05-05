"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express")); // Correctly import NextFunction
const url_1 = require("@app/models/url");
const error_1 = require("@app/utils/error");
const router = express_1.default.Router();
router.post('/', (req, res, next) => {
    const { urlPath } = req.body;
    if (!urlPath || typeof urlPath !== 'string') {
        return next((0, error_1.createError)(400, "Url path is required"));
    }
    const longUrl = (0, url_1.getOriginalUrl)(urlPath);
    if (longUrl) {
        const response = { longUrl };
        res.json(response);
    }
    else {
        return next((0, error_1.createError)(404, "Url path not found"));
    }
});
exports.default = router;
//# sourceMappingURL=decode.js.map