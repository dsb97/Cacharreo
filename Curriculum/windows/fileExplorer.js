var theme = `default`;

var fileSystem = [
    {
        icon: `/resources/themes/${theme}/system/computer.png`,
        name: 'Este equipo',
        content: [
            {
                icon: `/resources/themes/${theme}/system/disk.png`,
                name: 'Disco del sistema',
                content: [
                    {
                        icon: `/resources/themes/${theme}/system/folder.png`,
                        name: `user`,
                        content: [
                            {
                                icon: `/resources/themes/${theme}/system/code.png`,
                                name: `Lenguajes`,
                                content: [
                                    {
                                        icon: `/resources/themes/${theme}/misc/csharp.png`,
                                        name: `C#`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/sql.png`,
                                        name: `SQL`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/html.png`,
                                        name: `HTML5`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/css.png`,
                                        name: `CSS`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/js.png`,
                                        name: `JavaScript`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/ts.png`,
                                        name: 'TypeScript',
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/php.png`,
                                        name: `PHP`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/java.png`,
                                        name: `Java`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/vb.png`,
                                        name: `Visual Basic`,
                                        content: []
                                    }
                                ]
                            },
                            {
                                icon: `/resources/themes/${theme}/system/framework.png`,
                                name: `Frameworks`,
                                content: [
                                    {
                                        icon: `/resources/themes/${theme}/misc/net.png`,
                                        name: `.NET (Classic/Core)`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/laravel.png`,
                                        name: `Laravel`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/angular.png`,
                                        name: `Angular`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/bootstrap.png`,
                                        name: `Bootstrap`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/jQuery.png`,
                                        name: `JQuery`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/electron.png`,
                                        name: `Electron`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/vue.png`,
                                        name: `Vue`,
                                        content: []
                                    }
                                ]
                            },
                            {
                                icon: `/resources/themes/${theme}/system/ide.png`,
                                name: `Entornos de desarrollo`,
                                content: [
                                    {
                                        icon: `/resources/themes/${theme}/misc/vs.png`,
                                        name: `Visual Studio`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/vscode.png`,
                                        name: `Visual Studio Code`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/netbeans.png`,
                                        name: `Netbeans`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/android.png`,
                                        name: `Android Studio`,
                                        content: []
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/misc/eclipse.png`,
                                        name: `Eclipse`,
                                        content: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        icon: `/resources/themes/${theme}/system/folder.png`,
                        name: `resources`,
                        content: [
                            {
                                icon: `/resources/userpic.png`,
                                name: `userpic.png`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/folder.png`,
                                name: `themes`,
                                content: [
                                    {
                                        icon: `/resources/themes/${theme}/system/themes.png`,
                                        name: `default.theme`
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/system/themes.png`,
                                        name: `windows.theme`
                                    },
                                    {
                                        icon: `/resources/themes/${theme}/system/themes.png`,
                                        name: `macOS.theme`
                                    },
                                ]
                            },
                            {
                                icon: `/resources/themes/${theme}/system/folder.png`,
                                name: `wallpapers`,
                                content: [
                                    {
                                        icon: `/resources/themes/wallpapers/Flower.jpg`,
                                        name: `Flower.jpg`
                                    },
                                    {
                                        icon: `/resources/themes/wallpapers/Grass.jpg`,
                                        name: `Grass.jpg`
                                    },
                                    {
                                        icon: `/resources/themes/wallpapers/Lavender.jpg`,
                                        name: `Lavender.jpg`
                                    },
                                    {
                                        icon: `/resources/themes/wallpapers/Mountains.jpg`,
                                        name: `Mountains.jpg`
                                    },
                                    {
                                        icon: `/resources/themes/wallpapers/Sand.jpg`,
                                        name: `Sand.jpg`
                                    },
                                    {
                                        icon: `/resources/themes/wallpapers/Sky.jpg`,
                                        name: `Sky.jpg`
                                    },
                                    {
                                        icon: `/resources/themes/wallpapers/Strawberries.jpg`,
                                        name: `Strawberries.jpg`
                                    },
                                    {
                                        icon: `/resources/themes/wallpapers/Waves.jpg`,
                                        name: `Waves.jpg`
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        icon: `/resources/themes/${theme}/system/folder.png`,
                        name: `apps`,
                        content: [
                            {
                                icon: `/resources/themes/${theme}/system/settings.png`,
                                name: `Ajustes`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/calculator.png`,
                                name: `Calculadora`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/calendar.png`,
                                name: `Calendario`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/mail.png`,
                                name: `Correo electrónico`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/document.png`,
                                name: `Editor de documentos`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/folder.png`,
                                name: `Explorador de archivos`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/photos.png`,
                                name: `Fotos`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/info.png`,
                                name: `Información`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/task-manager.png`,
                                name: `Monitor del sistema`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/internet.png`,
                                name: `Navegador`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/music.png`,
                                name: `Reproductor de música`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/terminal.png`,
                                name: `Terminal`
                            },
                            {
                                icon: `/resources/themes/${theme}/system/weather.png`,
                                name: `Tiempo`
                            },
                            {
                                icon: `/resources/themes/${theme}/misc/vscode.png`,
                                name: `VS Code`
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

function openFolder(path, addHistoryURL) {
    let dirs = path.split('/');
    let currentFolder = fileSystem;
    dirs.forEach((dir) => {
        if (dir.length != 0) {
            currentFolder = currentFolder.find(x => x.name == dir).content;
        }
    });

    let content = document.getElementById('galleryContent');
    content.innerHTML = "";
    currentFolder.forEach((icon) => {

        content.innerHTML += `
        <button class="rounded" ${icon.content == null ? '' : `ondblclick="openFolder('${path}/${icon.name}', true)"`}>
            <img src="${icon.icon}" alt="">
            <p>${icon.name}</p>
        </button>
        `;
    });

    if (addHistoryURL) {
        addCachedWindowHistoryURL(windowID, path);
    }

    window.parent.document.getElementById(windowID).getElementsByTagName('div')[3].innerHTML = path.split('/')[path.split('/').length - 1];
}

function back() {
    backHistoryIndex(windowID);
    let cW = getCachedWindow(windowID);
    let backPath = cW.history.urlList[cW.history.index];
    openFolder(backPath, false);
}

function forward() {
    forwardHistoryIndex(windowID);
    let cW = getCachedWindow(windowID);
    let forwardPath = cW.history.urlList[cW.history.index];
    openFolder(forwardPath, false);
}
