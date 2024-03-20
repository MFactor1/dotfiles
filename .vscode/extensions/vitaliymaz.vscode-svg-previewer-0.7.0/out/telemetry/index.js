"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryEvents = exports.createTelemetryReporter = void 0;
const vscode_extension_telemetry_1 = require("vscode-extension-telemetry");
const events = require("./events");
const extensionId = require('../../package.json').name;
const extensionVersion = require('../../package.json').version;
const key = Buffer.from('MDI0NGYzMTgtZGVkZC00NjIwLWI2OGItNzYwNzIyNDMwMmU1', 'base64').toString();
function createTelemetryReporter() {
    return new vscode_extension_telemetry_1.default(extensionId, extensionVersion, key);
}
exports.createTelemetryReporter = createTelemetryReporter;
exports.TelemetryEvents = events;
//# sourceMappingURL=index.js.map