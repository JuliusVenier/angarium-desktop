const { app, BrowserWindow } = require('electron')
const fs = require("node:fs");
const os = require("node:os");
const replace = require('replace-in-file');

const CONFIG_FILE_PATH = os.homedir() + "/angarium.json";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
    })

    try {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH).toString())
        win.loadURL(config.scheme + '://' + config.host + ':' + config.port);
    } catch (error){
        console.error('An Error occurred: ', error)
        win.loadFile('src/error.html')
        return;
    }
}

app.whenReady().then(() => {
    createWindow()
})