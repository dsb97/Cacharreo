const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('musicAPI', {
    loadSongTags: (filePath) => ipcRenderer.invoke('load-song-tags', filePath)
});

contextBridge.exposeInMainWorld('fileAPI', {
    getFilesInDirectory: (folderPath) => ipcRenderer.invoke('get-files-in-directory', folderPath),
    openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),
    saveFile: (filePath, content) => ipcRenderer.invoke('save-file', filePath, content),
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath)
});
