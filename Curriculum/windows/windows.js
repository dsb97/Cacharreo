var windowHistory = [];
var win = {
    windowID: 0,
    urls: [],
    urlPosition: 0
}
function openLink(url, id) {
    if(localStorage.getItem('windowHistory') == null) {
        localStorage.setItem('windowHistory', JSON.stringify(windowHistory))
    } else {
        windowHistory = JSON.parse(localStorage.getItem('windowHistory'));
    }
    let fullURL = `${url}?id=${id}`;
    let wID = windowHistory.filter((element) => element.windowID == id);
    let w = {...win};
    if(wID.length != 0) {
        w = wID[0];
        w.urls.push(fullURL);
        w.urlPosition = (w.urls.length - 1 < 0) ? 0 : w.urls.length - 1;
        //debugger;
    } else {
        w.windowID = id;
        w.urls.push(fullURL);
        windowHistory.push(w);
        w.urlPosition = (w.urls.length - 1 < 0) ? 0 : w.urls.length - 1;
        //debugger;
    }
    localStorage.setItem('windowHistory', JSON.stringify(windowHistory));
    window.parent.document.getElementById(id).getElementsByTagName('iframe')[0].src = fullURL;

}

