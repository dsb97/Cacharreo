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
        this.parentWindow.style.top = `calc(50% - ${height / 2}px)`;
        this.parentWindow.style.left = `calc(50% - ${width / 2}px)`;
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


        //this.baseURL = 'http://localhost/apiDSB/';
        this.baseURL = 'https://dsbcv-api.000webhostapp.com/';
        this.albumCover = this.windowDocument.getElementById('albumCover');
        this.title = this.windowDocument.getElementById('title');
        this.artistAlbum = this.windowDocument.getElementById('artistAlbum');
        this.reproductor = this.windowDocument.getElementById('reproductor');
        this.playPauseButton = this.windowDocument.getElementById('playPause');
        this.shuffleButton = this.windowDocument.getElementById('shuffle');
        this.barraTiempo = this.windowDocument.getElementById('barraTiempo');
        this.shuffle = false;

        this.canciones = [];
        this.cancionesBackup = [];
        this.cancionActual = 0;

        showWindow(this.parentWindow);
    }

    cargarCancion(mode) {
        let songInfo = this.canciones[this.cancionActual];
        let sourceMP3 = `${this.baseURL}music/${songInfo.ID}.mp3`;
        let sourceAlbumCover = `${this.baseURL}music/${songInfo.ID}.jpg`;

        this.reproductor.src = sourceMP3;
        this.albumCover.src = sourceAlbumCover;
        this.title.innerText = songInfo.Titulo;
        this.artistAlbum.innerText = `${songInfo.Artista} - ${songInfo.Album}`;

        if (mode == 'UI') {
            this.reproductor.play();
        }
    }

    cambiarCancion(direccion) {
        this.cancionActual += direccion;
        if (this.cancionActual < 0) {
            this.cancionActual = this.canciones.length - 1;
        } else if (this.cancionActual >= this.canciones.length) {
            this.cancionActual = 0;
        }
        this.cargarCancion('UI');
    }

    togglePlayPause() {
        if (this.reproductor.paused) {
            this.reproductor.play();
            this.playPauseButton.innerHTML = '<i style="font-size: 14pt;" class="bi bi-pause-fill"></i>';
        } else {
            this.reproductor.pause();
            this.playPauseButton.innerHTML = '<i style="font-size: 14pt;" class="bi bi-play-fill"></i>';
        }
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
        if (this.shuffle) {
            this.canciones = this.canciones.sort(() => Math.random() - 0.5);
            this.shuffleButton.style.borderColor = 'red';
        } else {
            for (let i = 0; i < this.cancionesBackup.length; i++) {
                this.canciones[i] = this.cancionesBackup[i];
            }
            this.shuffleButton.style.borderColor = null;
        }
    }

    cambiarTiempo() {
        var nuevoTiempo = this.barraTiempo.value;
        this.reproductor.currentTime = nuevoTiempo;
    }

    timeUpdate(me) {
        var tiempoActual = me.reproductor.currentTime;
        var duracionTotal = me.reproductor.duration;
        me.barraTiempo.value = tiempoActual;
        me.barraTiempo.max = duracionTotal;
    }

    load() {
        var apiUrl = `${this.baseURL}api.php`;

        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                this.canciones = data;
                for (let i = 0; i < data.length; i++) {
                    this.cancionesBackup[i] = data[i];
                }
                this.cargarCancion('Code');
                this.reproductor.addEventListener('timeupdate', () => this.timeUpdate(this));
            },
            error: (xhr, status, error) => {
                console.error('Error en la solicitud:', error);
            }
        });
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