const { contextBridge, ipcRenderer } = require('electron');

// PTY bridge
let ptyCallbacks = {};
let ptyIdCounter = 0;

ipcRenderer.on('pty-data', (event, { ptyId, data }) => {
  if (ptyCallbacks[ptyId]) {
    ptyCallbacks[ptyId].forEach(cb => cb(data));
  }
});

ipcRenderer.on('pty-exit', (event, { ptyId, exitCode }) => {
  if (ptyCallbacks[ptyId]) {
    ptyCallbacks[ptyId].forEach(cb => cb({ exit: true, code: exitCode }));
  }
});

contextBridge.exposeInMainWorld('pty', {
  spawn(id, shell, options) {
    ipcRenderer.send('pty-spawn', { ptyId: id, shell, options });
  },
  write(id, data) {
    ipcRenderer.send('pty-write', { ptyId: id, data });
  },
  resize(id, cols, rows) {
    ipcRenderer.send('pty-resize', { ptyId: id, cols, rows });
  },
  kill(id) {
    ipcRenderer.send('pty-kill', { ptyId: id });
  },
  onData(ptyId, callback) {
    if (!ptyCallbacks[ptyId]) ptyCallbacks[ptyId] = [];
    ptyCallbacks[ptyId].push(callback);
  }
});

// Window controls
contextBridge.exposeInMainWorld('winCtrl', {
  minimize() { ipcRenderer.send('win-minimize'); },
  maximize() { ipcRenderer.send('win-maximize'); },
  close()    { ipcRenderer.send('win-close'); }
});

// Platform info
contextBridge.exposeInMainWorld('hermesWin', {
  platform: process.platform
});
