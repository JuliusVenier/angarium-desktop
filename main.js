/**
 * Hauptmodul der Electron-Anwendung.
 * Importiert erforderliche Module und erstellt das Hauptfenster der Anwendung.
 *
 * @module Hauptmodul
 */

const { app, BrowserWindow } = require('electron')
const fs = require("node:fs");
const os = require("node:os");
const replace = require('replace-in-file');

const CONFIG_FILE_PATH = os.homedir() + "/angarium.json";

/**
 * Erstellt das Hauptfenster der Anwendung und lädt die URL aus der Konfigurationsdatei.
 * Wenn ein Fehler auftritt, wird eine Fehlerseite geladen.
 *
 * @function createWindow
 */
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

/**
 * Wird aufgerufen, wenn die Electron-App bereit ist.
 * Initialisiert das Hauptfenster.
 *
 * @function app.whenReady
 */
app.whenReady().then(() => {
    createWindow()
})