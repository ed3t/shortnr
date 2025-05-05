"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUrls = exports.encodeUrl = void 0;
const url_1 = require("@app/models/url");
const constants_1 = require("@app/constants");
const urlDatabase = {};
const generateShortUrl = () => {
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += constants_1.SHORT_URL_CHAR_SET.charAt(Math.floor(Math.random() * constants_1.SHORT_URL_CHAR_SET.length));
    }
    return result;
};
const encodeUrl = (longUrl) => {
    const shortUrlPath = generateShortUrl();
    // Save the long URL to the in-memory bd
    (0, url_1.saveUrl)(longUrl, shortUrlPath);
    return shortUrlPath;
};
exports.encodeUrl = encodeUrl;
const listUrls = () => {
    return Object.entries(urlDatabase).map(([shortUrlPath, { longUrl, createdAt, visits }]) => ({
        shortUrlPath,
        longUrl,
        createdAt,
        visits
    }));
};
exports.listUrls = listUrls;
//# sourceMappingURL=encoder.js.map