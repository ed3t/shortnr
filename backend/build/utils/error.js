"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (status, message) => {
    const err = new Error(message);
    err.status = status;
    err.message = message;
    return err;
};
exports.createError = createError;
//# sourceMappingURL=error.js.map