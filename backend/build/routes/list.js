"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const url_1 = require("@app/models/url");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const allUrls = (0, url_1.listUrls)();
    res.json(allUrls);
});
exports.default = router;
//# sourceMappingURL=list.js.map