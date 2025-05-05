"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrl = void 0;
const url_1 = require("url");
const validateUrl = (raw) => {
    let urlString = raw.trim();
    if (!/^[a-z][a-z\d+\-.]*:\/\//i.test(urlString)) {
        urlString = 'http://' + urlString;
    }
    let parsed;
    try {
        parsed = new url_1.URL(urlString);
    }
    catch (_a) {
        throw new Error('Invalid URL format');
    }
    const allowed = ['http:', 'https:', 'ftp:', 'mailto:', 'tel:', 'file:'];
    if (!allowed.includes(parsed.protocol)) {
        throw new Error(`Unsupported URL scheme: "${parsed.protocol}". ` +
            `Use one of ${allowed.join(', ')}`);
    }
    if (['http:', 'https:', 'ftp:'].includes(parsed.protocol)) {
        if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(parsed.hostname)) {
            throw new Error(`Invalid domain name: "${parsed.hostname}"`);
        }
    }
    return parsed.href;
};
exports.validateUrl = validateUrl;
//# sourceMappingURL=index.js.map