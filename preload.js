const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getAppPath: () => ipcRenderer.invoke('get-app-path'),
    saveFile: (fileName, data) => ipcRenderer.invoke('save-file', fileName, data),
    readFile: (fileName) => ipcRenderer.invoke('read-file', fileName),
    deleteFile: (fileName) => ipcRenderer.invoke('delete-file', fileName),
    listFiles: () => ipcRenderer.invoke('list-files'),
    minimize: () => ipcRenderer.invoke('window-minimize'),
    maximize: () => ipcRenderer.invoke('window-maximize'),
    createChildWindow: (windowId, options) => ipcRenderer.invoke('create-child-window', windowId, options),
    closeChildWindow: (windowId) => ipcRenderer.invoke('close-child-window', windowId),
});