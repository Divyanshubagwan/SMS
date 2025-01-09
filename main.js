const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
let preloadWindow;

app.on('ready', () => {
  // Set the ELECTRON environment variable
  process.env.ELECTRON = 'true';

  // Create a preload window
  preloadWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false, // No title bar or controls
    transparent: true, // Optional: transparent background
    alwaysOnTop: true,
    webPreferences: {
      devTools: false, // Disable dev tools for the preloader
    },
  });

  // Load the preloader HTML
  preloadWindow.loadFile(path.join(__dirname, 'preloader.html'));

  // Create the main application window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // Keep hidden until content is ready
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Adjust as needed
    },
  });

  // Load the static files from the `out` directory
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'out', 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Open DevTools
  mainWindow.webContents.openDevTools();

  // Wait for the app to be ready, then show the main window
  mainWindow.webContents.once('dom-ready', () => {
    preloadWindow.close(); // Close the preloader
    mainWindow.show(); // Show the main window
  });

  // Error handling
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error(`Failed to load URL: ${validatedURL}, Error: ${errorDescription}`);
  });

  mainWindow.webContents.on('crashed', () => {
    console.error('The application has crashed.');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});