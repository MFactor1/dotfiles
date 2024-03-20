"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewEditorProvider = void 0;
const vscode = require("vscode");
const path = require("path");
const webViewMessaging_1 = require("../webViewMessaging");
const events_1 = require("../telemetry/events");
class PreviewEditorProvider {
    constructor(extensionPath, telemetryReporter) {
        this.extensionPath = extensionPath;
        this.telemetryReporter = telemetryReporter;
    }
    static register(extensionPath, telemetryReporter) {
        const provider = new PreviewEditorProvider(extensionPath, telemetryReporter);
        return vscode.window.registerCustomEditorProvider(PreviewEditorProvider.viewType, provider);
    }
    resolveCustomTextEditor(document, webviewPanel) {
        return __awaiter(this, void 0, void 0, function* () {
            this.telemetryReporter.sendTelemetryEvent(events_1.TELEMETRY_EVENT_SHOW_PREVIEW_EDITOR);
            const update = () => __awaiter(this, void 0, void 0, function* () {
                const message = yield this.getUpdateWebViewMessage(document.uri);
                webviewPanel.webview.postMessage(message);
            });
            webviewPanel.webview.options = { enableScripts: true };
            webviewPanel.webview.html = this.getHtml(webviewPanel);
            yield update();
            const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
                if (e.document.uri.toString() === document.uri.toString()) {
                    update();
                }
            });
            const receiveMessageSubscription = webviewPanel.webview.onDidReceiveMessage(message => {
                if (message.command === 'sendTelemetryEvent') {
                    this.telemetryReporter.sendTelemetryEvent(message.payload.eventName, message.payload.properties);
                }
                if (message.command === 'changeBoundingBoxVisibility') {
                    vscode.workspace.getConfiguration('svg').update('preview.boundingBox', message.payload.visible, true);
                    this.telemetryReporter.sendTelemetryEvent(events_1.TELEMETRY_EVENT_TOGGLE_BOUNDING_BOX, { visible: message.payload.visible });
                }
                if (message.command === 'changeTransparencyGridVisibility') {
                    vscode.workspace.getConfiguration('svg').update('preview.transparencyGrid', message.payload.visible, true);
                    this.telemetryReporter.sendTelemetryEvent(events_1.TELEMETRY_EVENT_TOGGLE_TRANSPARENCY_GRID, { visible: message.payload.visible });
                }
            });
            const changeThemeSubscription = vscode.window.onDidChangeActiveColorTheme(() => {
                webviewPanel.webview.postMessage(webViewMessaging_1.activeColorThemeChanged());
            });
            webviewPanel.onDidDispose(() => {
                changeDocumentSubscription.dispose();
                receiveMessageSubscription.dispose();
                changeThemeSubscription.dispose();
            });
        });
    }
    getUpdateWebViewMessage(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield vscode.workspace.openTextDocument(uri);
            const showBoundingBox = vscode.workspace.getConfiguration('svg').get('preview.boundingBox');
            const showTransparencyGrid = vscode.workspace.getConfiguration('svg').get('preview.transparencyGrid');
            return webViewMessaging_1.updatePreview({
                uri: uri.toString(),
                data: document.getText(),
                settings: { showBoundingBox, showTransparencyGrid }
            });
        });
    }
    getHtml(webviewPanel) {
        const webview = webviewPanel.webview;
        const basePath = vscode.Uri.file(path.join(this.extensionPath, 'media'));
        const cssPath = vscode.Uri.file(path.join(this.extensionPath, 'media', 'styles', 'styles.css'));
        const jsPath = vscode.Uri.file(path.join(this.extensionPath, 'media', 'index.js'));
        const base = `<base href="${webview.asWebviewUri(basePath)}">`;
        const securityPolicy = `
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src ${webview.cspSource}; img-src ${webview.cspSource} data:; script-src ${webview.cspSource}; style-src ${webview.cspSource};"
        />
    `;
        const css = `<link rel="stylesheet" type="text/css" href="${webview.asWebviewUri(cssPath)}">`;
        const scripts = `<script type="text/javascript" src="${webview.asWebviewUri(jsPath)}"></script>`;
        return `<!DOCTYPE html><html><head>${base}${securityPolicy}${css}</head><body>${scripts}</body></html>`;
    }
}
exports.PreviewEditorProvider = PreviewEditorProvider;
PreviewEditorProvider.viewType = 'svgPreviewer.customEditor';
//# sourceMappingURL=previewEditor.js.map