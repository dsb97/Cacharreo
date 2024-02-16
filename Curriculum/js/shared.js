var systemSettings = {
    theme: 'default',
    wallpaper: '/resources/themes/wallpapers/Frogs.png',
    autoWindowColor: true,
    windowColor: 'rgba(0,0,0,0.45)',
    blur: '15pt',
    fontColor: 'rgb(255,255,255)',
    version: '1.0',
    fileSystem: []
}

var keySettings = {
    theme: 'theme',
    wallpaper: 'wallpaper',
    windowColor: 'windowColor',
    blur: 'blur',
    fontColor: 'fontColor',
    version: 'version',
    fileSystem: 'fileSystem',
    autoWindowColor: 'autoWindowColor'
}

var windowStatus = {
    minimized: 'minimized',
    restored: 'restored'
}

//Ventanas abiertas
var cachedWindow = {
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
    setBlur();
    setFontColor();
    setWindowColor();
}

function setWindowColor() {
    let windowColor = getSetting(keySettings.windowColor);
    let rgbaWindowColor = windowColor.replaceAll('rgba(', '').replaceAll(')', '').split(',');
    document.getElementById('dynamicStyle').innerHTML += ` .defaultWindowColor { background-color: ${windowColor}; }`;
    getRGBALightness(windowColor, function (brightness) {
        document.getElementById('dynamicStyle').innerHTML += ` .dock .dock-container li:hover { background-color: ${brightness > 127 ? 'rgba(255,255,255,' : 'rgba(0,0,0,'}${parseFloat(rgbaWindowColor[3]) / 0.45}); }`
        document.getElementById('dynamicStyle').innerHTML += ` .fixedStartMenuItem:hover { background-color: ${brightness > 127 ? 'rgba(255,255,255,' : 'rgba(0,0,0,'}${parseFloat(rgbaWindowColor[3]) / 0.45}); }`
    });
 
    document.getElementById('dynamicStyle').innerHTML += ` .gallery button:hover { background-color: ${windowColor}; }`
}

function setFontColor() {
    let fontColor = getSetting(keySettings.fontColor);
    document.getElementById('dynamicStyle').innerHTML += ` .defaultFontColor { color: ${fontColor} !important; } .defaultFontColor:hover { color: ${fontColor} !important; } .defaultFontColor:focus { color: ${fontColor} !important; }`;
}

function setBlur() {
    let blur = getSetting(keySettings.blur);
    document.getElementById('dynamicStyle').innerHTML += ` .blur { backdrop-filter: blur(${blur}); -webkit-backdrop-filter: blur(${blur}); }`;
    document.getElementById('dynamicStyle').innerHTML += ` .menu::before, .share-menu::before { backdrop-filter: blur(${blur}); -webkit-backdrop-filter: blur(${blur}); }`;
    document.getElementById('dynamicStyle').innerHTML += ` .topbar { backdrop-filter: blur(${blur}); -webkit-backdrop-filter: blur(${blur}); }`;
    document.getElementById('dynamicStyle').innerHTML += ` .dock { backdrop-filter: blur(${blur}); -webkit-backdrop-filter: blur(${blur}); }`;
}

function getRGBALightness(rgbaColorString, callback) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 1;
    canvas.height = 1;
    ctx.fillStyle = rgbaColorString;
    ctx.fillRect(0, 0, 1, 1);
    getImageLightness(canvas.toDataURL(), callback);
}

function getImageLightness(imageSrc, callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function () {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var r, g, b, avg;

        for (var x = 0, len = data.length; x < len; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];

            avg = Math.floor((r + g + b) / 3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width * this.height));
        callback(brightness);
    }
}