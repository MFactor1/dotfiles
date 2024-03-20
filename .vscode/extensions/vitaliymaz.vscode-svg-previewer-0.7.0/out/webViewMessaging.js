"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeColorThemeChanged = exports.updatePreview = void 0;
function updatePreview(payload) {
    return {
        command: 'source:update',
        payload
    };
}
exports.updatePreview = updatePreview;
function activeColorThemeChanged() {
    return { command: 'theme:changed', payload: null };
}
exports.activeColorThemeChanged = activeColorThemeChanged;
//# sourceMappingURL=webViewMessaging.js.map