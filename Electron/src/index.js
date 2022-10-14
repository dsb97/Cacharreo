const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

app.setName('Ostiaputa');

ipcMain.on('nuevo:producto', (e, newProduct) => {
    //console.log(newProduct);
    mainWindow.webContents.send('nuevo:producto', newProduct);
    productWindow.close();
})

const menu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Nuevo producto',
                accelerator: process.platform == 'darwin' ? 'command+N' : 'Ctrl+N',
                click() {
                    createNewProductWindow()
                }
            },
            {
                label: 'Eliminar todos los productos',
                click()  {
                    mainWindow.webContents.send('products:remove-all');
                }
            }

        ]
    },
    {
        label: 'Ayuda',
        submenu: [
            {
                label: 'Acerca de...',
                click() {
                    console.log('HOLAAAAAAAAAAAAAAAAAA');
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    menu.unshift({
        label: app.getName(),
        submenu: [{
            label: 'Salir',
            accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
            click() {
                app.quit()
            }
        }]
    })
}

var isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules/', '.bin', 'electron')
    })
}

let mainWindow;
let productWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }));
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
    mainWindow.on('closed', () => {
        app.quit();
    })
});

function createNewProductWindow() {
    productWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Añadir nuevo producto',
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    });
    //productWindow.setMenu(null);
    productWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }));
    productWindow.on('closed', () => {
        productWindow = null;
    });
}

if (process.env.NODE_ENV !== 'production') {
    menu.push({
        label: 'DevTools',
        submenu: [{
            label: 'Show/Hide DevTools',
            accelerator: 'Ctrl+D',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }, {
            role: 'reload'
        }]
    })
}


