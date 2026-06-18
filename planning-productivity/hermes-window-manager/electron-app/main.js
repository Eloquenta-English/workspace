const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');

// node-pty for real terminals
let pty;
try {
  pty = require('node-pty');
} catch (e) {
  console.error('node-pty not available:', e.message);
}

const ptyProcesses = new Map();

function getShell() {
  if (process.platform === 'win32') {
    return process.env.COMSPEC || 'cmd.exe';
  }
  return process.env.SHELL || '/bin/bash';
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 700,
    minHeight: 400,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0a0a0f',
      symbolColor: '#6c5ce7',
      height: 36
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  return mainWindow;
}

// ═══ IPC HANDLERS ═══

// PTY spawn
ipcMain.on('pty-spawn', (event, { ptyId, shell, options }) => {
  if (!pty) {
    event.sender.send('pty-data', { ptyId, data: '\r\n[Error: node-pty not installed. Run: npm install]\r\n' });
    return;
  }

  const shellCmd = shell || getShell();
  const cwd = options?.cwd || os.homedir();
  const cols = options?.cols || 80;
  const rows = options?.rows || 24;

  try {
    const proc = pty.spawn(shellCmd, [], {
      name: 'xterm-256color',
      cols,
      rows,
      cwd,
      env: {
        ...process.env,
        TERM: 'xterm-256color',
        COLORTERM: 'truecolor'
      }
    });

    proc.onData(data => {
      event.sender.send('pty-data', { ptyId, data });
    });

    proc.onExit(({ exitCode }) => {
      event.sender.send('pty-exit', { ptyId, exitCode });
      ptyProcesses.delete(ptyId);
    });

    ptyProcesses.set(ptyId, proc);
  } catch (err) {
    event.sender.send('pty-data', { ptyId, data: `\r\n[Error spawning shell: ${err.message}]\r\n` });
  }
});

ipcMain.on('pty-write', (event, { ptyId, data }) => {
  const proc = ptyProcesses.get(ptyId);
  if (proc) proc.write(data);
});

ipcMain.on('pty-resize', (event, { ptyId, cols, rows }) => {
  const proc = ptyProcesses.get(ptyId);
  if (proc) proc.resize(cols, rows);
});

ipcMain.on('pty-kill', (event, { ptyId }) => {
  const proc = ptyProcesses.get(ptyId);
  if (proc) {
    proc.kill();
    ptyProcesses.delete(ptyId);
  }
});

// Window controls
ipcMain.on('win-minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.minimize();
});

ipcMain.on('win-maximize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  }
});

ipcMain.on('win-close', (event) => {
  // Kill all PTYs first
  ptyProcesses.forEach(proc => proc.kill());
  ptyProcesses.clear();
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.close();
});

// ═══ APP LIFECYCLE ═══
let mainWindow;

app.whenReady().then(() => {
  mainWindow = createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  ptyProcesses.forEach(proc => proc.kill());
  ptyProcesses.clear();
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  ptyProcesses.forEach(proc => proc.kill());
  ptyProcesses.clear();
});
