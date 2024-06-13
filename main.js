const { app, BrowserWindow } = require('electron')
const fs = require("node:fs");
const os = require("node:os");
const replace = require('replace-in-file');

const CONFIG_FILE_PATH = os.homedir() + "/angarium.json";

async function loadConfig() {
    let config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH).toString())

    const options = {
        files: "./index.html",
        from: [/{SCHEMA}/g, /{HOST}/g, /{PORT}/g],
        to: [config.scheme, config.host, config.port]
    }
    await replace(options)
}

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
    })

    try {
        await loadConfig();
    } catch (error){
        console.error('An Error occurred: ', error)
        win.loadFile('src/error.html')
        return;
    }

    win.loadFile('src/index.html')
}

app.whenReady().then(() => {
    createWindow()
})