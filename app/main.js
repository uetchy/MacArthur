const electron = require('electron')
const {
  app,
  BrowserWindow,
  dialog,
  ipcMain
} = require('electron')

let mainWindow
let urlToOpen

function init() {
  app.on('open-url', (event, url) => {
    console.log("Received", url);
    event.preventDefault()
    urlToOpen = url
    if (mainWindow) {
      mainWindow.webContents.send('open-url', urlToOpen)
      urlToOpen = ''
    }
  })

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    console.log("window-all-closed");
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    console.log("activate");
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    console.log("ready");
    // app.removeListener('open-url', addUrlToOpen)
    createWindow()

    // github-mac://openRepo/https://github.com/electron/electron
    app.setAsDefaultProtocolClient('github-mac')
    console.log("setAsDefaultProtocolClient")
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('open-url', urlToOpen)
    urlToOpen = ''
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    console.log("closed")
    mainWindow = null;
  })
}

init()
