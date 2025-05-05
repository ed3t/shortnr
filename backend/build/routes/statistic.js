"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const url_1 = require("@app/models/url");
const error_1 = require("@app/utils/error");
const router = express_1.default.Router();
router.get('/:shortUrl', (req, res, next) => {
    const { shortUrl } = req.params;
    const stats = (0, url_1.getUrlStat)(shortUrl);
    if (stats) {
        res.json(stats);
    }
    else {
        return next((0, error_1.createError)(404, "Short URL not found"));
    }
});
exports.default = router;
//# sourceMappingURL=statistic.js.map