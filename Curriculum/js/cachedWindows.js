//Ventanas abiertas
let cachedWindow = {
    windowID: 0,
    dockIcon: '',
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

function addCachedWindowHistoryURL(windowID, url) {
    let cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
    cWs.forEach((cW) => {
        if (cW.windowID == windowID) {
            cW.history.urlList = cW.history.urlList.slice(0, cW.history.index);
            cW.history.urlList.push(url);
            cW.history.index = (cW.history.urlList.length - 1) < 0 ? 0 : (cW.history.urlList.length - 1);
        }
    });
    sessionStorage.setItem('cachedWindows', JSON.stringify(cWs));
}

function getCachedWindows() {
    return cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
}