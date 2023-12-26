var music = class music {
    constructor(windowID) {
        this.windowID = windowID;
        this.parentWindow = document.getElementById(windowID);
        this.windowDocument = this.parentWindow.getElementsByTagName('iframe')[0].contentDocument;
        this.windowTitle = this.parentWindow.getElementsByTagName('div')[3];
        this.backButton = this.parentWindow.getElementsByClassName('backButton')[0];
        this.forwardButton = this.parentWindow.getElementsByClassName('forwardButton')[0];
        this.refreshButton = this.parentWindow.getElementsByClassName('refreshButton')[0];
        this.stopButton = this.parentWindow.getElementsByClassName('stopButton')[0];
        this.homeButton = this.parentWindow.getElementsByClassName('homeButton')[0];
        this.backButton.onclick = () => this.back();
        this.forwardButton.onclick = () => this.forward();
        this.refreshButton.onclick = () => this.refresh();
        this.stopButton.onclick = () => this.stop();
        this.homeButton.onclick = () => this.home();

        let height = 509, width = 729;
        this.parentWindow.style.height = `${height}px`;
        this.parentWindow.style.width = `${width}px`;
        this.parentWindow.style.top = `calc(50% - ${height/2}px)`;
        this.parentWindow.style.left = `calc(50% - ${width/2}px)`;
        this.parentWindow.querySelector('.min-button').style.display = 'none'
        this.parentWindow.querySelector('.windowHeader').ondblclick = null;
        this.parentWindow.onmousedown = null;
        this.parentWindow.onmousemove = null;

        this.backButton.style.display = "none";
        this.forwardButton.style.display = "none";
        this.refreshButton.style.display = "none";
        this.stopButton.style.display = "none";
        this.homeButton.style.display = "none";
        this.windowTitle.innerHTML = 'Reproductor de música';

        showWindow(this.parentWindow);
    }

    back() {

    }

    forward() {

    }

    refresh() {

    }

    stop() {

    }

    home() {

    }
}