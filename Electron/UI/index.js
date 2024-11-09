var startupPath = '/Volumes/Datos/Música';
var librarySongs = [];
var theme;
var contrastTheme;
var shuffle = false;

window.addEventListener("load", async (event) => {
    themeVisuals();
    await loadLibrary();
    loadSongsTab();
});

function themeVisuals() {
    document.getElementById('contentContainer').style.setProperty('height', `calc(100vh - ${document.getElementById('playerContainer').offsetHeight}px)`)
    theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    contrastTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'light' : 'dark';
    document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", theme)
    document.getElementById('controlButtons').querySelectorAll('button').forEach((button, index) => {
        try {
            button.classList.remove(`btn-outline-${theme}`);
        } catch (error) {

        }

        try {
            button.classList.add(`btn-outline-${contrastTheme}`)
        } catch (error) {

        }
    });
}

const resizer = document.getElementById('resizer');
const leftPanel = resizer.previousElementSibling;

let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    if (isResizing) {
        const newWidth = e.clientX;
        leftPanel.style.width = newWidth + 'px';
    }
}

function onMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    themeVisuals()
});

async function loadLibrary() {
    let libraryFile = await window.fileAPI.readFile(`${startupPath}/library.json`);
    if (libraryFile.success) {
        librarySongs = JSON.parse(libraryFile.data)
    } else {
        let musicList = await window.fileAPI.getFilesInDirectory(startupPath);
        for (const file of musicList) {
            let metadata = await window.musicAPI.loadSongTags(file.path);
            librarySongs.push(metadata);
        }
        await window.fileAPI.saveFile(`${startupPath}/library.json`, JSON.stringify(librarySongs));
    }
}

function loadSongsTab() {
    let fileListElement = document.getElementById('songsBody');
    let htmlContent = "";
    librarySongs.forEach((file, index) => {
        htmlContent += `<tr style="cursor: pointer">
                <td onclick="playSong(${index})">${file.title}</td>
                <td onclick="playSong(${index})">${file.artist}</td>
                <td onclick="playSong(${index})">${file.album}</td>
            </tr>`;
    });
    fileListElement.innerHTML = htmlContent;
    songsTable.classList.remove('d-none');
    waitSpinner.classList.add('d-none')
}

let audio = null;
async function playSong(index) {
    document.getElementById('albumCover').src = librarySongs[index].coverArt;
    document.getElementById('songTitle').innerText = librarySongs[index].title;
    document.getElementById('songArtist').innerText = librarySongs[index].artist;

    if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reinicia el tiempo de la canción anterior
    }
    audio = new Audio(librarySongs[index].filePath);

    audio.addEventListener('loadedmetadata', () => {
        // debugger;
        document.getElementById('totalTime').innerText = formatTime(audio.duration);
        document.getElementById('timeProgress').max = audio.duration;
    });

    audio.addEventListener('timeupdate', () => {
        // debugger;
        document.getElementById('currentTime').innerText = formatTime(audio.currentTime);
        document.getElementById('timeProgress').value = audio.currentTime;
        if (audio.currentTime >= audio.duration) {
            if (shuffle) {
                playSong(Math.floor(Math.random() * (librarySongs.length - 0)) + 0);
            } else {
                playSong(index + 1);
            }
        }
    });

    document.getElementById('timeProgress').oninput = function (e) {
        audio.currentTime = e.target.value;
    }


    audio.play();
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

document.getElementById('playPause').onclick = () => {
    if (audio.paused) {
        document.getElementById('playPause').innerHTML = `<i class="bi bi-pause-fill"></i>`;
        audio.play();
    } else {
        document.getElementById('playPause').innerHTML = `<i class="bi bi-play-fill"></i>`;
        audio.pause();
    }
};

// document.getElementById('pauseButton').onclick = () => {
//     if (audio) audio.pause();
// };

document.getElementById('shuffleButton').addEventListener('click', function (e) {
    shuffle = !shuffle
    if (shuffle) {
        document.getElementById('shuffleButton').classList.add(`btn-${contrastTheme}`);
        document.getElementById('shuffleButton').classList.remove(`btn-outline-${contrastTheme}`)
    } else {
        document.getElementById('shuffleButton').classList.remove(`btn-${contrastTheme}`);
        document.getElementById('shuffleButton').classList.add(`btn-outline-${contrastTheme}`)
    }
});

