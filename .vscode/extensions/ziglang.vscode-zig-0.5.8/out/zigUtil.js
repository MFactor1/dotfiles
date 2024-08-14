"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const fs = require("fs");
const path = require("path");
const vscode_1 = require("vscode");
exports.isWindows = process.platform === 'win32';
/** Executes a command. Shows an error message if the command isn't found */
function execCmd(cmd, options = {}) {
    const { fileName, onStart, onStdout, onStderr, onExit, cmdArguments } = options;
    let childProcess, firstResponse = true, wasKilledbyUs = false;
    const executingCmd = new Promise((resolve, reject) => {
        let cmdArguments = options ? options.cmdArguments : [];
        childProcess =
            cp.exec(cmd + ' ' + (cmdArguments || []).join(' '), { cwd: detectProjectRoot(fileName || vscode_1.workspace.rootPath + '/fakeFileName') }, handleExit);
        childProcess.stdout.on('data', (data) => {
            if (firstResponse && onStart) {
                onStart();
            }
            firstResponse = false;
            if (onStdout) {
                onStdout(data.toString());
            }
        });
        childProcess.stderr.on('data', (data) => {
            if (firstResponse && onStart) {
                onStart();
            }
            firstResponse = false;
            if (onStderr) {
                onStderr(data.toString());
            }
        });
        function handleExit(err, stdout, stderr) {
            executingCmd.isRunning = false;
            if (onExit) {
                onExit();
            }
            if (!wasKilledbyUs) {
                if (err) {
                    if (options.showMessageOnError) {
                        const cmdName = cmd.split(' ', 1)[0];
                        const cmdWasNotFound = 
                        // Windows method apparently still works on non-English systems
                        (exports.isWindows &&
                            err.message.includes(`'${cmdName}' is not recognized`)) ||
                            (!exports.isWindows && err.code === 127);
                        if (cmdWasNotFound) {
                            let notFoundText = options ? options.notFoundText : '';
                            vscode_1.window.showErrorMessage(`${cmdName} is not available in your path. ` + notFoundText);
                        }
                        else {
                            vscode_1.window.showErrorMessage(err.message);
                        }
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    resolve({ stdout: stdout, stderr: stderr });
                }
            }
        }
    });
    executingCmd.stdin = childProcess.stdin;
    executingCmd.kill = killProcess;
    executingCmd.isRunning = true;
    return executingCmd;
    function killProcess() {
        wasKilledbyUs = true;
        if (exports.isWindows) {
            cp.spawn('taskkill', ['/pid', childProcess.pid.toString(), '/f', '/t']);
        }
        else {
            childProcess.kill('SIGINT');
        }
    }
}
exports.execCmd = execCmd;
const buildFile = 'build.zig';
function findProj(dir, parent) {
    if (dir === '' || dir === parent) {
        return '';
    }
    if (fs.lstatSync(dir).isDirectory()) {
        const build = path.join(dir, buildFile);
        if (fs.existsSync(build)) {
            return dir;
        }
    }
    return findProj(path.dirname(dir), dir);
}
exports.findProj = findProj;
function detectProjectRoot(fileName) {
    const proj = findProj(path.dirname(fileName), '');
    if (proj !== '') {
        return proj;
    }
    return undefined;
}
exports.detectProjectRoot = detectProjectRoot;
//# sourceMappingURL=zigUtil.js.map