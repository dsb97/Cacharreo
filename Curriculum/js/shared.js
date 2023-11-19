let systemSettings = {
    zoomLevel: 1,
    theme: 'default',
    wallpaper: 'resources/themes/wallpapers/Grass.jpg',
    autoWindowColor: false,
    windowColor: 'rgba(0,0,0,0.45)',
    fontColor: 'rgb(255,255,255)',
    version: '1.0',
    fileSystem: []
}

let keySettings = {
    zoomLevel: 'zoomLevel',
    theme: 'theme',
    wallpaper: 'wallpaper',
    windowColor: 'windowColor',
    fontColor: 'fontColor',
    version: 'version',
    fileSystem: 'fileSystem',
    autoWindowColor: 'autoWindowColor'
}

let windowStatus = {
    minimized: 'minimized',
    restored: 'restored'
}

//Ventanas abiertas
let cachedWindow = {
    windowID: 0,
    dockIcon: '',
    windowStatus: windowStatus.restored,
    history: {
        index: 0,
        urlList: []
    }
}

function createWindowsCache() {
    sessionStorage.setItem('cachedWindows', JSON.stringify([]));
}

function getCachedWindow(windowID) {
    let cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
    if (cWs != null && cWs.length > 0) {
        return cWs.filter((cW) => { return cW.windowID == windowID })[0];
    }
    return { ...cachedWindow }
}

function addCachedWindow(cachedWindow) {
    let cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
    cWs.push(cachedWindow);
    sessionStorage.setItem('cachedWindows', JSON.stringify(cWs));
}

function removeCachedWindow(windowID) {
    let cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
    cWs = cWs.filter((cW) => { return cW.windowID != windowID });
    sessionStorage.setItem('cachedWindows', JSON.stringify(cWs));
}

function getCachedWindows() {
    return cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
}

function addCachedWindowHistoryURL(windowID, url) {
    let cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
    cWs.forEach((cW) => {
        if (cW.windowID == windowID) {
            cW.history.urlList = cW.history.urlList.slice(0, cW.history.index + 1);
            cW.history.urlList.push(url);
            cW.history.index = (cW.history.urlList.length - 1) < 0 ? 0 : (cW.history.urlList.length - 1);
        }
    });
    sessionStorage.setItem('cachedWindows', JSON.stringify(cWs));
}

function backHistoryIndex(windowID) {
    let cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
    cWs.forEach((cW) => {
        if (cW.windowID == windowID) {
            cW.history.index = (cW.history.index - 1) < 0 ? 0 : (cW.history.index - 1);
        }
    });
    sessionStorage.setItem('cachedWindows', JSON.stringify(cWs));
}

function forwardHistoryIndex(windowID) {
    let cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
    cWs.forEach((cW) => {
        if (cW.windowID == windowID) {
            cW.history.index = (cW.history.index + 1) > (cW.history.urlList.length - 1) ? cW.history.urlList.length - 1 : (cW.history.index + 1);
        }
    });
    sessionStorage.setItem('cachedWindows', JSON.stringify(cWs));
}

function updateCachedWindowStatus(windowID, windowStatus) {
    ;
    let cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
    cWs.forEach((cW) => {
        if (cW.windowID == windowID) {
            cW.windowStatus = windowStatus;
        }
    });
    sessionStorage.setItem('cachedWindows', JSON.stringify(cWs));
}

function getSystemSettings() {
    let sS = JSON.parse(localStorage.getItem('systemSettings'));
    if (sS == null) {
        sS = { ...systemSettings };
        localStorage.setItem('systemSettings', JSON.stringify(sS));
    }
    return JSON.parse(localStorage.getItem('systemSettings'));
}

function getSetting(key) {
    let sS = getSystemSettings();
    return sS[key];
}

function setSetting(key, value) {
    let sS = getSystemSettings();
    sS[key] = value;
    localStorage.setItem('systemSettings', JSON.stringify(sS));
}

function showWindow(w) {
    w.getElementsByTagName('iframe')[0].contentWindow.setColorStyles();
    w.classList.remove('d-none');
    let timeOut = setTimeout(() => {
        w.style.transition = null;
        clearTimeout(timeOut);
    }, 300);
    requestAnimationFrame(() => {
        w.style.transition = 'all 0.2s ease-in-out 0s';
        w.style.transform = "scale(1)";
    });
}

function reloadColors() {
    setColorStyles();

    getCachedWindows().forEach((x) => {
        document.getElementById(x.windowID).getElementsByTagName('iframe')[0].contentWindow.setColorStyles();
    });
}

function setColorStyles() {
    document.getElementById('dynamicStyle').innerHTML = "";
    setFontColor();
    setWindowColor();
}

function setWindowColor() {
    let windowColor = getSetting(keySettings.windowColor);
    document.getElementById('dynamicStyle').innerHTML += ` .defaultWindowColor { background-color: ${windowColor}; }`;
}

function setFontColor() {
    let fontColor = getSetting(keySettings.fontColor);
    document.getElementById('dynamicStyle').innerHTML += ` .defaultFontColor { color: ${fontColor} !important; } .defaultFontColor:hover { color: ${fontColor} !important; } .defaultFontColor:focus { color: ${fontColor} !important; }`;
}