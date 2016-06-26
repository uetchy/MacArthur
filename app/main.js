const electron = require('electron')
const {app, BrowserWindow, dialog, ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let urlToOpen

function init() {
  app.on('open-url', (e, url) => {
    e.preventDefault()
    urlToOpen = url
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
    if (win === null) {
      createWindow()
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    console.log("ready")
    // app.removeListener('open-url', addUrlToOpen)
    createWindow()

    // github-mac://openRepo/https://github.com/electron/electron
    app.setAsDefaultProtocolClient('github-mac')
    console.log("setAsDefaultProtocolClient")
  })
}

function createWindow() {
  console.log("createWindow()")
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`)

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('open-url', urlToOpen)
  });

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    console.log("closed")
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  })
}

init()
