const { app, BrowserWindow, Menu } = require('electron')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1600,
        minWidth: 1600,
        height: 900,
        minHeight: 900,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // Menu.setApplicationMenu(null);
    mainWindow.loadFile('./html/index.html');
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    })
})
