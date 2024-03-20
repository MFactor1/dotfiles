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
exports.Preview = void 0;
const vscode = require("vscode");
const path = require("path");
const nls = require("vscode-nls");
const webViewMessaging_1 = require("../webViewMessaging");
const events_1 = require("../telemetry/events");
const localize = nls.loadMessageBundle();
class Preview {
    constructor(_resource, _panel, _extensionPath, telemetryReporter) {
        this._resource = _resource;
        this._panel = _panel;
        this._extensionPath = _extensionPath;
        this.telemetryReporter = telemetryReporter;
        this._onDisposeEmitter = new vscode.EventEmitter();
        this.onDispose = this._onDisposeEmitter.event;
        this._onDidChangeViewStateEmitter = new vscode.EventEmitter();
        this.onDidChangeViewState = this._onDidChangeViewStateEmitter.event;
        this._panel.webview.html = this.getHtml();
        this.setPanelIcon();
        this._panel.onDidChangeViewState((event) => {
            this._onDidChangeViewStateEmitter.fire(event);
            if (event.webviewPanel.visible && this._postponedMessage) {
                this.postMessage(this._postponedMessage);
                delete this._postponedMessage;
            }
        });
        this._panel.onDidDispose(() => {
            this._onDisposeEmitter.fire();
            this.dispose();
            this.changeThemeSubscription.dispose();
        });
        this._panel.webview.onDidReceiveMessage(message => {
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
        this.changeThemeSubscription = vscode.window.onDidChangeActiveColorTheme(() => {
            this.postMessage(webViewMessaging_1.activeColorThemeChanged());
        });
    }
    static create(source, viewColumn, extensionPath, telemetryReporter) {
        return __awaiter(this, void 0, void 0, function* () {
            const panel = vscode.window.createWebviewPanel(Preview.viewType, Preview.getPreviewTitle(source.path), viewColumn, {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'media'))]
            });
            return new Preview(source, panel, extensionPath, telemetryReporter);
        });
    }
    static revive(source, panel, extensionPath, telemetryReporter) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Preview(source, panel, extensionPath, telemetryReporter);
        });
    }
    static getPreviewTitle(path) {
        return localize('svg.preview.panel.title', 'Preview {0}', path.replace(/^.*[\\/]/, ''));
    }
    get source() {
        return this._resource;
    }
    get panel() {
        return this._panel;
    }
    update(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            if (resource) {
                this._resource = resource;
            }
            this._panel.title = Preview.getPreviewTitle(this._resource.fsPath);
            const message = yield this.getUpdateWebViewMessage(this._resource);
            this.postMessage(message);
        });
    }
    dispose() {
        this._panel.dispose();
    }
    postMessage(message) {
        if (this._panel.visible) {
            this._panel.webview.postMessage(message);
        }
        else {
            // It is not possible posting messages to hidden web views
            // So saving the last update and flush it once panel become visible
            this._postponedMessage = message;
        }
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
    setPanelIcon() {
        const root = path.join(this._extensionPath, 'media', 'images');
        this._panel.iconPath = {
            light: vscode.Uri.file(path.join(root, 'preview.svg')),
            dark: vscode.Uri.file(path.join(root, 'preview-inverse.svg'))
        };
    }
    getHtml() {
        const webview = this._panel.webview;
        const basePath = vscode.Uri.file(path.join(this._extensionPath, 'media'));
        const cssPath = vscode.Uri.file(path.join(this._extensionPath, 'media', 'styles', 'styles.css'));
        const jsPath = vscode.Uri.file(path.join(this._extensionPath, 'media', 'index.js'));
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
exports.Preview = Preview;
Preview.viewType = 'svg-preview';
//# sourceMappingURL=preview.js.map