"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const vscode_1 = require("vscode");
const zigUtil_1 = require("./zigUtil");
class ZigFormatProvider {
    constructor(logChannel) {
        this._channel = logChannel;
    }
    provideDocumentFormattingEdits(document, options, token) {
        const logger = this._channel;
        return zigFormat(document)
            .then(({ stdout }) => {
            logger.clear();
            const lastLineId = document.lineCount - 1;
            const wholeDocument = new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
            return [vscode_1.TextEdit.replace(wholeDocument, stdout), vscode_1.TextEdit.setEndOfLine(vscode_1.EndOfLine.LF)];
        })
            .catch((reason) => {
            let config = vscode.workspace.getConfiguration('zig');
            logger.clear();
            logger.appendLine(reason.toString().replace('<stdin>', document.fileName));
            if (config.get("revealOutputChannelOnFormattingError")) {
                logger.show(true);
            }
            return null;
        });
    }
}
exports.ZigFormatProvider = ZigFormatProvider;
// Same as full document formatter for now
class ZigRangeFormatProvider {
    constructor(logChannel) {
        this._channel = logChannel;
    }
    provideDocumentRangeFormattingEdits(document, range, options, token) {
        const logger = this._channel;
        return zigFormat(document)
            .then(({ stdout }) => {
            logger.clear();
            const lastLineId = document.lineCount - 1;
            const wholeDocument = new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
            return [vscode_1.TextEdit.replace(wholeDocument, stdout), vscode_1.TextEdit.setEndOfLine(vscode_1.EndOfLine.LF)];
        })
            .catch((reason) => {
            const config = vscode.workspace.getConfiguration('zig');
            logger.clear();
            logger.appendLine(reason.toString().replace('<stdin>', document.fileName));
            if (config.get("revealOutputChannelOnFormattingError")) {
                logger.show(true);
            }
            return null;
        });
    }
}
exports.ZigRangeFormatProvider = ZigRangeFormatProvider;
function zigFormat(document) {
    const config = vscode.workspace.getConfiguration('zig');
    const zigPath = config.get('zigPath') || 'zig';
    const options = {
        cmdArguments: ['fmt', '--stdin'],
        notFoundText: 'Could not find zig. Please add zig to your PATH or specify a custom path to the zig binary in your settings.',
    };
    const format = zigUtil_1.execCmd(zigPath, options);
    format.stdin.write(document.getText());
    format.stdin.end();
    return format;
}
//# sourceMappingURL=zigFormat.js.map