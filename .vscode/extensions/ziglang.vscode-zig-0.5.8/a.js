const axios = require("axios");
const DOWNLOAD_INDEX = "https://ziglang.org/download/index.json";

function getHostZigName() {
    let os = process.platform;
    if (os == "darwin") os = "macos";
    if (os == "win32") os = "windows";
    let arch = process.arch;
    if (arch == "ia32") arch = "x86";
    if (arch == "x64") arch = "x86_64";
    if (arch == "arm64") arch = "aarch64";
    if (arch == "ppc") arch = "powerpc";
    if (arch == "ppc64") arch = "powerpc64le";
    return `${arch}-${os}`;
}

async function getVersions() {
    const hostName = getHostZigName();
    const tarball = (
        await axios.get(DOWNLOAD_INDEX, {
            responseType: "arraybuffer",
        })
    ).data;
    const indexJson = JSON.parse(tarball);
    const result = new Map();
    for (let [key, value] of Object.entries(indexJson)) {
        if (key == "master") key = "nightly";
        if (value[hostName]) {
            result.set(key, {
                url: value[hostName]["tarball"],
                sha: value[hostName]["shasum"],
            });
        }
    }
    return result;
}

getVersions().then((res) => {
    console.log(res);
});
