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
exports.simpleViewer = void 0;
const vscode = require("vscode");
const path = require("path");
const tools_1 = require("../plantuml/diagram/tools");
const config_1 = require("../plantuml/config");
const common_1 = require("../plantuml/common");
const tools_2 = require("../plantuml/tools");
const exportToBuffer_1 = require("../plantuml/exporter/exportToBuffer");
const ui_1 = require("../ui/ui");
var previewStatus;
(function (previewStatus) {
    previewStatus[previewStatus["default"] = 0] = "default";
    previewStatus[previewStatus["error"] = 1] = "error";
    previewStatus[previewStatus["processing"] = 2] = "processing";
})(previewStatus || (previewStatus = {}));
class SimpleViewer extends vscode.Disposable {
    constructor() {
        super(() => this.dispose());
        this._disposables = [];
        this.watchDisposables = [];
        this.error = "";
        this.zoomUpperLimit = false;
        this.register();
    }
    dispose() {
        this._disposables && this._disposables.length && this._disposables.map(d => d.dispose());
        this.watchDisposables && this.watchDisposables.length && this.watchDisposables.map(d => d.dispose());
    }
    reset() {
        this.rendered = null;
        this.previewPageStatus = "";
        this.imageError = "";
        this.error = "";
    }
    updateWebView() {
        let env = {
            localize: common_1.localize,
            imageData: this.imageData ? this.imageData : "",
            imageError: "",
            error: "",
            hasError: "",
            status: this.previewPageStatus,
            icon: "file:///" + path.join(common_1.extensionPath, "images", "icon.png"),
            settings: JSON.stringify({
                zoomUpperLimit: this.zoomUpperLimit,
                showSpinner: this.status === previewStatus.processing,
                showSnapIndicators: config_1.config.previewSnapIndicators,
            }),
        };
        try {
            switch (this.status) {
                case previewStatus.default:
                case previewStatus.error:
                    env.imageError = this.imageError;
                    env.error = this.error.replace(/\n/g, "<br />");
                    env.hasError = env.error ? "error" : "";
                    this._uiPreview.show("simpleViewer.html", env);
                    break;
                case previewStatus.processing:
                    env.error = "";
                    env.hasError = "";
                    this._uiPreview.show("simpleViewer.html", env);
                    break;
                default:
                    break;
            }
        }
        catch (error) {
            return error;
        }
    }
    setUIStatus(status) {
        this.previewPageStatus = status;
    }
    update(processingTip) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.taskKilling)
                return;
            yield this.killTasks();
            // console.log("updating...");
            // do not await doUpdate, so that preview window could open before update task finish.
            this.doUpdate(processingTip).catch(e => (0, tools_2.showMessagePanel)(e));
        });
    }
    killTasks() {
        if (!this.task)
            return;
        this.task.canceled = true;
        if (!this.task.processes || !this.task.processes.length)
            return Promise.resolve(true);
        this.taskKilling = true;
        return Promise.all(this.task.processes.map(p => this.killTask(p))).then(() => {
            this.task = null;
            this.taskKilling = false;
        });
    }
    killTask(process) {
        return new Promise((resolve, reject) => {
            process.on('exit', (_code, _sig) => {
                resolve(true);
            });
            if (!process.kill('SIGINT') && process.exitCode != null) {
                resolve(true);
            }
        });
    }
    get TargetChanged() {
        let current = (0, tools_1.currentDiagram)();
        if (!current)
            return false;
        let changed = (!this.rendered || !this.rendered.isEqual(current));
        if (changed) {
            this.rendered = current;
            this.error = "";
            this.imageError = "";
            this.previewPageStatus = "";
        }
        return changed;
    }
    doUpdate(processingTip) {
        return __awaiter(this, void 0, void 0, function* () {
            let diagram = (0, tools_1.currentDiagram)();
            if (!diagram) {
                this.status = previewStatus.error;
                this.error = (0, common_1.localize)(3, null);
                this.updateWebView();
                return;
            }
            let task = (0, exportToBuffer_1.exportToBuffer)(diagram, "svg");
            this.task = task;
            if (processingTip)
                this.processing();
            yield task.promise.then(result => {
                if (task.canceled)
                    return;
                this.task = null;
                this.status = previewStatus.default;
                this.error = "";
                this.imageError = "";
                this.imageData = result.pop().toString("utf8");
                this.updateWebView();
            }, error => {
                if (task.canceled)
                    return;
                this.task = null;
                this.status = previewStatus.error;
                let err = (0, tools_2.parseError)(error)[0];
                this.error = err.error;
                let b64 = err.out.toString('base64');
                if (!(b64 || err.error))
                    return;
                this.imageError = `data:image/svg+xml;base64,${b64}`;
                this.updateWebView();
            });
        });
    }
    //display processing tip
    processing() {
        this.status = previewStatus.processing;
        this.updateWebView();
    }
    register() {
        let disposable;
        //register command
        disposable = vscode.commands.registerCommand('plantuml.preview', () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.editor = vscode.window.activeTextEditor;
                if (!this.editor)
                    return;
                let diagrams = (0, tools_1.diagramsOf)(this.editor.document);
                if (!diagrams.length)
                    return;
                //reset in case that starting commnad in none-diagram area, 
                //or it may show last error image and may cause wrong "TargetChanged" result on cursor move.
                this.reset();
                this.TargetChanged;
                //update preview
                yield this.update(true);
            }
            catch (error) {
                (0, tools_2.showMessagePanel)(error);
            }
        }));
        this._disposables.push(disposable);
        this._uiPreview = new ui_1.UI("plantuml.preview", (0, common_1.localize)(17, null), path.join(common_1.extensionPath, "templates"));
        this._disposables.push(this._uiPreview);
        this._uiPreview.addEventListener("message", e => this.handleMessage(e));
        this._uiPreview.addEventListener("open", () => this.startWatch());
        this._uiPreview.addEventListener("close", () => { this.stopWatch(); this.killTasks(); });
    }
    handleMessage(e) {
        let message = e.message;
        if (message && message.searchText) {
            this.searchText(message.searchText);
        }
        else {
            this.setUIStatus(JSON.stringify(message));
        }
    }
    searchText(searchText) {
        const document = this.editor.document;
        const text = document.getText();
        const index = text.indexOf(searchText);
        const position = document.positionAt(index);
        const positionEnd = document.positionAt(index + searchText.length);
        this.editor.selection = new vscode.Selection(position, positionEnd);
        this.editor.revealRange(new vscode.Range(position, positionEnd), vscode.TextEditorRevealType.InCenter);
        vscode.window.showTextDocument(document, this.editor.viewColumn);
    }
    startWatch() {
        let disposable;
        let disposables = [];
        //register watcher
        let lastTimestamp = new Date().getTime();
        disposable = vscode.workspace.onDidChangeTextDocument(e => {
            if (!config_1.config.previewAutoUpdate)
                return;
            if (!e || !e.document || !e.document.uri)
                return;
            if (e.document.uri.scheme == "plantuml")
                return;
            lastTimestamp = new Date().getTime();
            setTimeout(() => {
                if (new Date().getTime() - lastTimestamp >= 400) {
                    if (!(0, tools_1.currentDiagram)())
                        return;
                    this.update(true);
                }
            }, 500);
        });
        disposables.push(disposable);
        disposable = vscode.window.onDidChangeTextEditorSelection(e => {
            if (!config_1.config.previewAutoUpdate)
                return;
            lastTimestamp = new Date().getTime();
            setTimeout(() => {
                if (new Date().getTime() - lastTimestamp >= 400) {
                    if (!this.TargetChanged)
                        return;
                    this.editor = vscode.window.activeTextEditor;
                    this.update(true);
                }
            }, 500);
        });
        disposables.push(disposable);
        this.watchDisposables = disposables;
    }
    stopWatch() {
        for (let d of this.watchDisposables) {
            d.dispose();
        }
        this.watchDisposables = [];
    }
}
exports.simpleViewer = new SimpleViewer();
//# sourceMappingURL=simpleViewer.js.map