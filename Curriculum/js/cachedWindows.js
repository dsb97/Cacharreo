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
    //debugger;
    let cWs = JSON.parse(sessionStorage.getItem('cachedWindows'));
    cWs.forEach((cW) => {
        if (cW.windowID == windowID) {
            cW.windowStatus = windowStatus;
        }
    });
    sessionStorage.setItem('cachedWindows', JSON.stringify(cWs));
}