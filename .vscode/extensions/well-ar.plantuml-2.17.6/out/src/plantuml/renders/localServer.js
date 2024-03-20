"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localServer = void 0;
const config_1 = require("../config");
const tools_1 = require("../tools");
const httpWrapper_1 = require("./httpWrapper");
const httpErrors_1 = require("./httpErrors");
const url = require("url");
let noPOSTServers = {};
let POSTSupportiveServers = {};
let serverProcess = null;
class LocalServer {
    /**
     * Indicates the exporter should limt concurrency or not.
     * @returns boolean
     */
    limitConcurrency() {
        return false;
    }
    /**
     * formats return an string array of formats that the exporter supports.
     * @returns an array of supported formats
     */
    formats() {
        return [
            "png",
            "svg",
            "txt"
        ];
    }
    /**
     * export a diagram to file or to Buffer.
     * @param diagram The diagram to export.
     * @param format format of export file.
     * @param savePath if savePath is given, it exports to a file, or, to Buffer.
     * @returns ExportTask.
     */
    render(diagram, format, savePath) {
        let server = config_1.config.server(diagram.parentUri);
        if (!server) {
            return {
                processes: [],
                promise: Promise.reject(),
            };
        }
        const serverPromise = this.startServer(diagram);
        let allPms = [...Array(diagram.pageCount).keys()].map((index) => {
            let savePath2 = savePath ? (0, tools_1.addFileIndex)(savePath, index, diagram.pageCount) : "";
            if (noPOSTServers[server]) {
                // Servers like the official one doesn't support POST
                return serverPromise.then(() => (0, httpWrapper_1.httpWrapper)("GET", server, diagram, format, index, savePath2));
            }
            else {
                return serverPromise.then(() => (0, httpWrapper_1.httpWrapper)("POST", server, diagram, format, index, savePath2))
                    .then(buf => {
                    POSTSupportiveServers[server] = true;
                    return buf;
                })
                    .catch(err => {
                    if (err instanceof httpErrors_1.HTTPError && err.isResponeError && !POSTSupportiveServers[server]) {
                        // do not retry POST again, if the server gave unexpected respone
                        noPOSTServers[server] = true;
                        // fallback to GET
                        return (0, httpWrapper_1.httpWrapper)("GET", server, diagram, format, index, savePath2);
                    }
                    return Promise.reject(err);
                });
            }
        }, Promise.resolve(Buffer.alloc(0)));
        return {
            processes: [],
            promise: Promise.all(allPms),
        };
    }
    getMapData(diagram, savePath) {
        return this.render(diagram, "map", savePath);
    }
    startServer(diagram) {
        let server = config_1.config.server(diagram.parentUri);
        let port = '';
        try {
            let u = url.parse(server);
            port = '' + u.port;
        }
        catch (_ex) {
        }
        let params = [
            '-jar',
            config_1.config.jar(diagram.parentUri),
            '-picoweb:' + port,
        ];
        const { spawn } = require('child_process');
        return new Promise((resolve, reject) => {
            if (serverProcess != null) {
                resolve();
                return;
            }
            serverProcess = spawn('java', params, { shell: true });
            serverProcess.stderr.on('data', (data) => {
                resolve();
            });
            serverProcess.stdout.on('data', (data) => {
                resolve();
            });
            serverProcess.on('close', (code) => {
                serverProcess = null;
            });
        });
    }
}
exports.localServer = new LocalServer();
//# sourceMappingURL=localServer.js.map