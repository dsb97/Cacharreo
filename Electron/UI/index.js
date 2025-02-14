var startupPath = '/Volumes/Datos/Música';
var librarySongs = [];
var theme;
var contrastTheme;
var shuffle = false;
var resizer;
var leftPanel;
var isResizing = false;
var audio = null;


window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    themeVisuals()
});

window.addEventListener('load', async (event) => {
    loadResizer();
    themeVisuals();
    //await loadLibrary();
    //loadSongsTab();
    document.querySelector('.right-panel').addEventListener('scroll', handleScroll);
});


function handleScroll(event) {
    const bigPlayer = document.getElementById('bigPlayer');
    const miniPlayer = document.getElementById('miniPlayer');
    const threshold = bigPlayer.offsetHeight * 0.8
    const scrolled = event.target.scrollTop;
    if (scrolled > threshold) {
        miniPlayer.style.visibility = 'visible';
        bigPlayer.style.opacity = '0';
        bigPlayer.style.pointerEvents = 'none';
    } else {
        miniPlayer.style.visibility = 'hidden';
        bigPlayer.style.opacity = '1';
        bigPlayer.style.pointerEvents = 'auto';
    }
}

function loadResizer() {
    resizer = document.getElementById('resizer');
    leftPanel = resizer.previousElementSibling;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', onResizeMouseMove);
        document.addEventListener('mouseup', onResizeMouseUp);
    });
}

function toggleDarkLightMode(button, classToToggle, reversed) {
    try {
        if (reversed) {
            button.classList.remove(`${classToToggle}-${contrastTheme}`)
            button.classList.add(`${classToToggle}-${theme}`);
        } else {
            button.classList.remove(`${classToToggle}-${theme}`);
            button.classList.add(`${classToToggle}-${contrastTheme}`)
        }

    } catch (error) {
        console.log('Error at toggling styles');
    }
}

function themeVisuals() {
    theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    contrastTheme = theme == 'dark' ? 'light' : 'dark';
    document.getElementsByTagName('html')[0].setAttribute("data-bs-theme", theme);
    document.querySelector('.controls').querySelectorAll('button').forEach((element) => toggleDarkLightMode(element, 'btn-outline', false));
    document.querySelector('.mini-controls').querySelectorAll('button').forEach((element) => toggleDarkLightMode(element, 'btn-outline', false));
    toggleDarkLightMode(document.getElementById('miniPlayer'), 'bg', true);
}

function onResizeMouseMove(e) {
    if (isResizing) {
        const newWidth = e.clientX;
        leftPanel.style.width = newWidth + 'px';
    }
}

function onResizeMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', onResizeMouseMove);
    document.removeEventListener('mouseup', onResizeMouseUp);
}

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

// document.getElementById('playPause').onclick = () => {
//     if (audio.paused) {
//         document.getElementById('playPause').innerHTML = `<i class="bi bi-pause-fill"></i>`;
//         audio.play();
//     } else {
//         document.getElementById('playPause').innerHTML = `<i class="bi bi-play-fill"></i>`;
//         audio.pause();
//     }
// };

// document.getElementById('shuffleButton').addEventListener('click', function (e) {
//     shuffle = !shuffle
//     if (shuffle) {
//         document.getElementById('shuffleButton').classList.add(`btn-${contrastTheme}`);
//         document.getElementById('shuffleButton').classList.remove(`btn-outline-${contrastTheme}`)
//     } else {
//         document.getElementById('shuffleButton').classList.remove(`btn-${contrastTheme}`);
//         document.getElementById('shuffleButton').classList.add(`btn-outline-${contrastTheme}`)
//     }
// });



