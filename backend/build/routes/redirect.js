"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const url_1 = require("@app/models/url");
const error_1 = require("@app/utils/error");
const logger_1 = require("@config/logger");
const router = express_1.default.Router();
router.get('/:urlPath', (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { urlPath } = req.params;
    try {
        const longUrl = (0, url_1.getOriginalUrl)(urlPath);
        if (longUrl) {
            return res.redirect(longUrl);
        }
        else {
            return next((0, error_1.createError)(404, 'Short URL not found'));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        logger_1.logger.error('Internal Server Error', err);
        return next((0, error_1.createError)(500, 'Internal Server Error'));
    }
}));
exports.default = router;
//# sourceMappingURL=redirect.js.map