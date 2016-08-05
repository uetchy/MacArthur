const url = require('url')
const {app, BrowserWindow} = require('electron') // eslint-disable-line import/no-extraneous-dependencies

// Globals
let mainWindow
let urlToOpen

app.on('open-url', (event, appURL) => {
	event.preventDefault()
	console.log('Received', appURL)
	let gitURL = ''
	try {
		gitURL = url.parse(appURL).path.slice(1)
	} catch (err) {
		console.error('Is not valid URL:', err)
		return
	}
	if (mainWindow) {
		mainWindow.webContents.send('open-url', gitURL)
	} else {
		urlToOpen = gitURL
	}
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	console.log('window-all-closed')
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	console.log('activate')
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
	console.log('ready')
	createWindow()

	// github-mac://openRepo/https://github.com/electron/electron
	app.setAsDefaultProtocolClient('github-mac')
	console.log('setAsDefaultProtocolClient')
})

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 400,
		height: 600
	})

	mainWindow.loadURL(`file://${__dirname}/app/index.html`)

	mainWindow.webContents.on('did-finish-load', () => {
		if (urlToOpen) {
			mainWindow.webContents.send('open-url', urlToOpen)
			urlToOpen = ''
		}
	})

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		console.log('closed')
		mainWindow = null
	})
}
