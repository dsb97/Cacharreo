var fileExplorer = class fileExplorer {
    constructor(windowID, windowPath) {
        this.windowID = windowID;
        try{
            this.windowPath = JSON.parse(windowPath)
        } catch (x) {
            this.windowPath = windowPath;
        }
        this.parentWindow = document.getElementById(windowID);
        this.windowDocument = this.parentWindow.getElementsByTagName('iframe')[0].contentDocument;
        this.windowTitle = this.parentWindow.getElementsByTagName('div')[3];
        this.backButton = this.parentWindow.getElementsByClassName('backButton')[0];
        this.forwardButton = this.parentWindow.getElementsByClassName('forwardButton')[0];
        this.refreshButton = this.parentWindow.getElementsByClassName('refreshButton')[0];
        this.stopButton = this.parentWindow.getElementsByClassName('stopButton')[0];
        this.homeButton = this.parentWindow.getElementsByClassName('homeButton')[0];
        let height = 460, width = 965;
        this.parentWindow.style.height = `${height}px`;
        this.parentWindow.style.width = `${width}px`;
        this.parentWindow.style.top = `calc(50% - ${height/2}px)`;
        this.parentWindow.style.left = `calc(50% - ${width/2}px)`;

        this.backButton.onclick = () => this.back();
        this.forwardButton.onclick = () => this.forward();
        this.refreshButton.onclick = () => this.refresh();
        this.stopButton.onclick = () => this.stop();
        this.homeButton.onclick = () => this.home();
        this.load();
    }


    load() {
        this.windowTitle.innerHTML = 'Explorador de archivos';
        this.backButton.title = "Atrás";
        this.stopButton.title = "Adelante";
        this.homeButton.style.display = "none";

        this.openFolder(this.windowPath, true);

        showWindow(this.parentWindow);
    }

    openFolder(path, addHistoryURL) {
        let self = this;
        let dirs = path.split('/');
        let currentFolder = getSetting(keySettings.fileSystem);
        dirs.forEach((dir) => {
            if (dir.length != 0) {
                currentFolder = currentFolder.find(x => x.name == dir).content;
            }
        });

        let content = this.windowDocument.getElementById('galleryContent');
        content.innerHTML = "";
        currentFolder.forEach((icon) => {
            let addedButton = this.windowDocument.createElement('button');
            addedButton.classList.add('rounded');
            addedButton.innerHTML = `
            <img src="${icon.icon}" alt="">
            <p class="defaultFontColor">${icon.name}</p>
            `;

            addedButton.addEventListener('dblclick', function (event) {
                if (icon.content == null) {
                    let appName;
                    let url;
                    let path;
                    //Si se trata de una app o un fichero
                    if (icon.internalName) {
                        //App
                        appName = icon.internalName.replace('.app', '');
                        path = JSON.stringify(icon.path);
                    } else {
                        //Fichero
                        appName = icon.path[0].replace('.app', '');
                        path = JSON.stringify([icon.path[1], icon.path[2]]);
                    }
                    url = "/windows/" + appName + ".html";
                    window.parent.openWindow(url, appName, path);
                } else {                    
                    self.openFolder(`${path}/${icon.name}`, true);
                }
            });

            content.appendChild(addedButton);
        });

        if (addHistoryURL) {
            addCachedWindowHistoryURL(this.windowID, path);
        }

        window.parent.document.getElementById(this.windowID).getElementsByTagName('div')[3].innerHTML = path.split('/')[path.split('/').length - 1];

        this.toggleSidebarButtons(path);
    }


    toggleSidebarButtons(path) {
        let currentFolder = path.split('/')[path.split('/').length - 1].toLowerCase();
        let sidebarIcons = this.windowDocument.querySelectorAll('.link-dark.rounded');
        sidebarIcons.forEach(function (sI) {
            if (sI.classList.contains('active')) {
                sI.classList.remove('active');
            }

            sI.classList.forEach(function (cl) {
                if (currentFolder.toLowerCase().includes(cl.toLowerCase())) {
                    sI.classList.add('active');
                }
            })
        });
    }

    back() {
        backHistoryIndex(this.windowID);
        let cW = getCachedWindow(this.windowID);
        let backPath = cW.history.urlList[cW.history.index];
        this.openFolder(backPath, false);

    }

    forward() {
        forwardHistoryIndex(this.windowID);
        let cW = getCachedWindow(this.windowID);
        let forwardPath = cW.history.urlList[cW.history.index];
        this.openFolder(forwardPath, false);

    }

    refresh() {

    }

    stop() {

    }

    home() {

    }
}