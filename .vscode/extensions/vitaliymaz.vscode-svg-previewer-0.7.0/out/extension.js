"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const previewManager_1 = require("./features/previewManager");
const previewEditor_1 = require("./features/previewEditor");
const commandManager_1 = require("./commandManager");
const commands = require("./commands");
const telemetry_1 = require("./telemetry");
let telemetryReporter;
function activate(context) {
    telemetryReporter = telemetry_1.createTelemetryReporter();
    telemetryReporter.sendTelemetryEvent(telemetry_1.TelemetryEvents.TELEMETRY_EVENT_ACTIVATION);
    const previewManager = new previewManager_1.PreviewManager(context.extensionPath, telemetryReporter);
    vscode.window.registerWebviewPanelSerializer('svg-preview', previewManager);
    const commandManager = new commandManager_1.CommandManager();
    commandManager.register(new commands.ShowPreviewToSideCommand(previewManager, telemetryReporter));
    commandManager.register(new commands.ShowPreviewCommand(previewManager, telemetryReporter));
    commandManager.register(new commands.ShowSourceCommand(previewManager, telemetryReporter));
    context.subscriptions.push(commandManager);
    context.subscriptions.push(previewEditor_1.PreviewEditorProvider.register(context.extensionPath, telemetryReporter));
}
exports.activate = activate;
function deactivate() {
    telemetryReporter.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map