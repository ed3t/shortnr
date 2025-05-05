"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUrls = exports.getUrlStat = exports.getOriginalUrl = exports.saveUrl = void 0;
const urlDatabase = {};
const saveUrl = (longUrl, shortUrlPath) => {
    urlDatabase[shortUrlPath] = { longUrl, createdAt: new Date(), visits: 0 };
};
exports.saveUrl = saveUrl;
const getOriginalUrl = (shortUrlPath) => {
    const urlEntry = urlDatabase[shortUrlPath];
    if (urlEntry) {
        urlEntry.visits++;
        return urlEntry.longUrl;
    }
    return null;
};
exports.getOriginalUrl = getOriginalUrl;
const getUrlStat = (shortUrlPath) => {
    const urlEntry = urlDatabase[shortUrlPath];
    if (urlEntry) {
        return {
            shortUrlPath,
            longUrl: urlEntry.longUrl,
            visits: urlEntry.visits,
            createdAt: urlEntry.createdAt
        };
    }
    return null;
};
exports.getUrlStat = getUrlStat;
const listUrls = () => {
    return Object.entries(urlDatabase).map(([shortUrlPath, { longUrl, createdAt, visits }]) => ({
        shortUrlPath,
        longUrl,
        createdAt,
        visits
    }));
};
exports.listUrls = listUrls;
//# sourceMappingURL=url.js.map