const { app, BrowserWindow, dialog, ipcMain, globalShortcut } = require('electron');
// const { BrowserWindow } = require('electron-acrylic-window');
// const { app, dialog, ipcMain, globalShortcut } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const jsmediatags = require('jsmediatags');



let mainWindow = null;

let createWindow = () => {
    const windowConfig = {
        width: 1280,
        height: 780,
        webPreferences: {
            preload: __dirname + '/preload.js',
            nodeIntegration: false,
            contextIsolation: true
        }
    };

    mainWindow = new BrowserWindow(windowConfig);
    mainWindow.loadFile(__dirname + '/UI/index.html')
    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        mainWindow.webContents.openDevTools()
    })

    ipcMain.handle('open-folder-dialog', async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory']
        });
        return result.filePaths;
    });

    ipcMain.handle('get-files-in-directory', async (event, folderPath) => {
        try {
            const files = await fs.readdir(folderPath);
            const fileList = [];
            for (const file of files) {
                if (file.startsWith('.')) {
                    continue;
                }
                const filePath = path.normalize(path.join(folderPath, file));
                try {
                    const stat = await fs.lstat(filePath);
                    if (stat.isFile()) {
                        fileList.push({
                            name: file,
                            path: filePath
                        });
                    }
                } catch (error) {
                    console.warn(`No se pudo acceder al archivo: ${filePath}`, error);
                }
            }
            return fileList;
        } catch (error) {
            console.error('Error al leer la carpeta:', error);
            return [];
        }
    });

    ipcMain.handle('load-song-tags', async (event, filePath) => {
        let result = {
            artist: '',
            title: '',
            album: '',
            filePath: filePath,
            coverArt: './src/no-album.png'
        };

        await new Promise((resolve, reject) => {
            jsmediatags.read(filePath, {
                onSuccess: (tag) => {
                    if (tag.tags.picture) {
                        const { data, format } = tag.tags.picture;
                        let base64String = '';
                        for (let i = 0; i < data.length; i++) {
                            base64String += String.fromCharCode(data[i]);
                        }
                        result.coverArt = `data:${format};base64,${btoa(base64String)}`;
                    }
                    result.artist = tag.tags.artist ?? 'Desconocido';
                    result.title = tag.tags.title ?? 'Desconocido';
                    result.album = tag.tags.album ?? 'Desconocido';
                    resolve();
                },
                onError: (error) => {
                    console.error(error);
                    reject(error);
                }
            });
        });

        return result;
    });

    ipcMain.handle('save-file', async (event, filePath, content) => {
        try {
            await fs.writeFile(filePath, content, 'utf8');
            return { success: true, message: 'File saved successfully' };
        } catch (error) {
            console.error('Error saving file:', error);
            return { success: false, message: 'Failed to save file' };
        }
    });

    ipcMain.handle('read-file', async (event, filePath) => {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return { success: true, data: data };
        } catch (error) {
            console.error('Error reading file:', error);
            return { success: false, message: 'Failed to read file' };
        }
    });
}

app.disableHardwareAcceleration()

app.on('ready', () => {
    createWindow()
})

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })