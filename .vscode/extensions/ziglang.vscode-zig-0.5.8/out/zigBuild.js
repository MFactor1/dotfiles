"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension_1 = require("./extension");
const cp = require("child_process");
const vscode = require("vscode");
function zigBuild() {
    const editor = vscode.window.activeTextEditor;
    const textDocument = editor.document;
    if (textDocument.languageId !== 'zig') {
        return;
    }
    const config = vscode.workspace.getConfiguration('zig');
    const buildOption = config.get("buildOption");
    let processArg = [buildOption];
    switch (buildOption) {
        case "build":
            break;
        default:
            processArg.push(textDocument.fileName);
            break;
    }
    let extraArgs = config.get("buildArgs");
    ;
    extraArgs.forEach(element => {
        processArg.push(element);
    });
    // TODO: switch rootpath to support multi root
    const cwd = vscode.workspace.rootPath;
    const buildPath = config.get("zigPath") || 'zig';
    extension_1.logChannel.appendLine(`Starting building the current workspace at ${cwd}`);
    let childProcess = cp.execFile(buildPath, processArg, { cwd }, (err, stdout, stderr) => {
        extension_1.logChannel.appendLine(stderr);
        var diagnostics = {};
        let regex = /(\S.*):(\d*):(\d*): ([^:]*): (.*)/g;
        extension_1.buildDiagnosticCollection.clear();
        for (let match = regex.exec(stderr); match; match = regex.exec(stderr)) {
            let path = match[1].trim();
            let line = parseInt(match[2]) - 1;
            let column = parseInt(match[3]) - 1;
            let type = match[4];
            let message = match[5];
            let severity = type.trim().toLowerCase() === "error" ?
                vscode.DiagnosticSeverity.Error :
                vscode.DiagnosticSeverity.Information;
            let range = new vscode.Range(line, column, line, column + 1);
            if (diagnostics[path] == null)
                diagnostics[path] = [];
            diagnostics[path].push(new vscode.Diagnostic(range, message, severity));
        }
        for (let path in diagnostics) {
            let diagnostic = diagnostics[path];
            extension_1.buildDiagnosticCollection.set(vscode.Uri.file(path), diagnostic);
        }
    });
}
exports.zigBuild = zigBuild;
//# sourceMappingURL=zigBuild.js.map