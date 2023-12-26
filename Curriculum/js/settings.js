var settings = class settings {
    constructor(windowID, windowPath) {
        this.windowID = windowID;
        try {
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
        this.backButton.onclick = () => this.back();
        this.forwardButton.onclick = () => this.forward();
        this.refreshButton.onclick = () => this.refresh();
        this.stopButton.onclick = () => this.stop();
        this.homeButton.onclick = () => this.home();

        let height = 460, width = 965;
        this.parentWindow.style.height = `${height}px`;
        this.parentWindow.style.width = `${width}px`;
        this.parentWindow.style.top = `calc(50% - ${height / 2}px)`;
        this.parentWindow.style.left = `calc(50% - ${width / 2}px)`;


        this.backButton.style.display = "none";
        this.forwardButton.style.display = "none";
        this.refreshButton.style.display = "none";
        this.stopButton.style.display = "none";
        this.homeButton.style.display = "none";
        this.windowTitle.innerHTML = 'Ajustes';

        try {
            this[this.windowPath[0]](this.windowPath[1]);
        } catch (x) {
        }

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

    loadWindowFontColorSettings() {
        this.windowDocument.getElementById('settingsContent').innerHTML = this.getSettingHTML('windowFontColor');

        let p = (parseFloat(getSetting(keySettings.windowColor).replace('rgba(', '').replace(')', '').split(',')[3]) * 100) / 0.45;
        this.windowDocument.querySelector('#opacityRange').value = p;
        this.windowDocument.querySelector('#opacityPercentage').innerHTML = `${p}%`;

        this.windowDocument.querySelector('#colorMode').value = getSetting(keySettings.autoWindowColor) ? '1' : '0';
        if (!getSetting(keySettings.autoWindowColor)) {
            this.windowDocument.querySelector('#colorPalette').classList.remove('d-none');
        }

        this.toggleSidebarButtons('windowsFonts');

    }

    loadBackgroundSettings() {
        this.windowDocument.getElementById('settingsContent').innerHTML = this.getSettingHTML('background');
        this.toggleSidebarButtons('background');
    }

    getSettingHTML(setting) {
        let r = '';
        switch (setting) {
            case 'windowFontColor':
                r = `<section class="w-100 p-3 d-flex justify-content-between align-items-center">
                <label> Color de las ventanas:</label>
                <select id="colorMode" class="form-select ms-5" style="width:auto;" aria-label="Color selection mode"
                    onchange="settingsCode.toggleWindowColorMode(event.target.value)">
                    <option value="1">Automático</option>
                    <option value="0">Personalizado</option>
                </select>
            </section>
            <section class="w-100 p-3 d-flex flex-column d-none" id="colorPalette">
                <label> Paleta de color:</label>
                <div class="d-flex justify-content-center">
                    <div style="width: 80%;">
                        <div title="Vidrio" onclick="settingsCode.changeWindowColor(219,241,254,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(219,241,254); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Azul" onclick="settingsCode.changeWindowColor(112,161,244,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(112,161,244); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Azul turquesa" onclick="settingsCode.changeWindowColor(110,254,254,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(110,254,254); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Verde" onclick="settingsCode.changeWindowColor(129,241,114,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(129,241,114); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Verde lima" onclick="settingsCode.changeWindowColor(203,254,111,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(203,254,111); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Amarillo" onclick="settingsCode.changeWindowColor(254,254,142,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(254,254,142); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Anaranjado" onclick="settingsCode.changeWindowColor(254,218,98,0.6)"
                            class="rounded"
                            style="display: inline-block;  background-color: rgb(254,218,98); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Tomate" onclick="settingsCode.changeWindowColor(254,95,95,0.6)"
                            class="rounded"
                            style="display: inline-block; ; background-color: rgb(254,95,95); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Fucsia" onclick="settingsCode.changeWindowColor(254,130,224,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(254,130,224); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Rosa" onclick="settingsCode.changeWindowColor(254,216,254,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(254,216,254); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Morado" onclick="settingsCode.changeWindowColor(189,150,228,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(189,150,228); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Cardo" onclick="settingsCode.changeWindowColor(231,211,234,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(231,211,234); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Camel" onclick="settingsCode.changeWindowColor(228,217,183,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(228,217,183); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Chocolate" onclick="settingsCode.changeWindowColor(182,142,142,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(182,142,142); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Negro" onclick="settingsCode.changeWindowColor(0,0,0,0.6)" class="rounded"
                            style="display: inline-block; background-color: rgb(0,0,0); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>
                        <div title="Blanco" onclick="settingsCode.changeWindowColor(255,255,255,0.6)"
                            class="rounded"
                            style="display: inline-block; background-color: rgb(255,255,255); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                        </div>

                        <div title="Más colores..." onclick="colorChooser.click()" class="rounded"
                            style="display: inline-block; background-image: linear-gradient(45deg, rgba(95,40,121,1) 0%, rgba(0,65,141,1) 14.2%, rgba(0,194,222,1) 28.5%, rgba(0,186,113,1) 42.8%, rgba(250,215,23,1) 57.1%, rgba(250,137,1,1) 71.4%, rgba(244,53,69,1) 85.7%); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                            <input type="color" style="visibility: hidden; position: fixed" oninput="
                                (() => {
                                    let cC = event.target.value,
                                    r = parseInt(cC.substr(1,2), 16),
                                    g = parseInt(cC.substr(3,2), 16),
                                    b = parseInt(cC.substr(5,2), 16);
                                    settingsCode.changeWindowColor(r,g,b,0.6);
                                })()
                                " id="colorChooser">
                        </div>
                    </div>
                </div>
            </section>
            <section class="w-100 p-3 d-flex justify-content-between align-items-top">
                <label for="opacityRange"> Intensidad:</label>
                <div class="w-100 d-flex justify-content-end">
                    <div class="w-100 ms-5">
                        <input oninput="settingsCode.changeOpacity(event)" type="range" class="form-range" min="0"
                            max="100" step="1" id="opacityRange">
                        <span id="opacityPercentage">%</label>
                    </div>
                </div>
            </section>
            
            <hr style="margin: 0px; border: 1px solid black;">
            <section class="w-100 p-3 d-flex justify-content-between align-items-center">
                <label> Color de la fuente:</label>
                <div class="w-100 p-3 d-flex flex-column">
                    <div class="d-flex justify-content-center">
                        <div style="width: 75%;">
                            <div title="Negro" onclick="settingsCode.changeFontColor(0,0,0)" class="rounded"
                                style="display: inline-block; background-color: rgb(0,0,0); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                            </div>
                            <div title="Blanco" onclick="settingsCode.changeFontColor(255,255,255)"
                                class="rounded"
                                style="display: inline-block; background-color: rgb(255,255,255); margin: 10px; max-width: 35pt; min-width: 35pt; width: 35pt; max-height: 35pt; min-height: 35pt; height: 35pt;">
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;
                break;
            case 'background':
                r = `<section class="w-100 p-3 d-flex flex-column" id="backgroundGallery">
                        <label> Fondo de pantalla:</label>
                        <div class="d-flex justify-content-center">
                            <div class="col-0 col-md-1 col-lg-2">
                            </div>
                            <div class="col-12 col-md-10 col-lg-8">
                            <div role="button" title="Aurora.png" onclick="settingsCode.changeWallpaper('Aurora.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Aurora.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Boat.png" onclick="settingsCode.changeWallpaper('Boat.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Boat.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Cliff.png" onclick="settingsCode.changeWallpaper('Cliff.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Cliff.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Flower.png" onclick="settingsCode.changeWallpaper('Flower.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Flower.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Frogs.png" onclick="settingsCode.changeWallpaper('Frogs.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Frogs.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Grass.png" onclick="settingsCode.changeWallpaper('Grass.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Grass.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Lavender.png" onclick="settingsCode.changeWallpaper('Lavender.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Lavender.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Mountains.png" onclick="settingsCode.changeWallpaper('Mountains.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Mountains.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Nebula.png" onclick="settingsCode.changeWallpaper('Nebula.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Nebula.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Sand.png" onclick="settingsCode.changeWallpaper('Sand.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Sand.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Sky.png" onclick="settingsCode.changeWallpaper('Sky.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Sky.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Space.png" onclick="settingsCode.changeWallpaper('Space.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Space.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Strawberries.png" onclick="settingsCode.changeWallpaper('Strawberries.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Strawberries.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Sunset beach.png" onclick="settingsCode.changeWallpaper('Sunset beach.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Sunset beach.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Toucan.png" onclick="settingsCode.changeWallpaper('Toucan.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Toucan.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Tree.png" onclick="settingsCode.changeWallpaper('Tree.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Tree.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Velvet.png" onclick="settingsCode.changeWallpaper('Velvet.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Velvet.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Waterfall.png" onclick="settingsCode.changeWallpaper('Waterfall.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Waterfall.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                        <div role="button" title="Waves.png" onclick="settingsCode.changeWallpaper('Waves.png')"
                            class="rounded"
                            style="display: inline-block; background-image: url('/resources/themes/wallpapers/thumbnails/Waves.png'); background-repeat: no-repeat; background-size: cover; margin: 10px; max-width: 140pt; min-width: 140pt; width: 140pt; max-height: 82pt; min-height: 82pt; height: 82pt;">
                        </div>
                            </div>
                            <div class="col-0 col-md-1 col-lg-2">
                            </div>
                        </div>
                    </section>`;
                break;
            default:
                r = '';
                break;
        }
        return r;
    }

    toggleWindowColorMode(value) {
        setSetting(keySettings.autoWindowColor, value == '1');
        if ((value == '1') == getSetting(keySettings.autoWindowColor)) {
            this.windowDocument.querySelector('#colorPalette').classList.toggle('d-none');
        }
        if (value == '1') {
            this.loadAutoWindowColor();
        }
    }

    loadAutoWindowColor() {
        var self = this;
        Vibrant.from(getSetting(keySettings.wallpaper)).getPalette().then(function (palette) {
            let rgb = [0, 0, 0];
            if (palette.Vibrant) {
                rgb = palette.Vibrant.getRgb();
            } else if (palette.DarkVibrant) {
                rgb = palette.DarkVibrant.getRgb();
            } else if (palette.LightMuted) {
                rgb = palette.LightMuted.getRgb();
            } else if (palette.LightVibrant) {
                rgb = palette.LightVibrant.getRgb();
            } else if (palette.Muted) {
                rgb = palette.Muted.getRgb();
            } else if (palette.DarkMuted) {
                rgb = palette.DarkMuted.getRgb();
            }

            let opacity = getSetting(keySettings.windowColor).replaceAll('rgba(', '').replaceAll(')', '').split(',')[3].trim();
            self.changeWindowColor(rgb[0], rgb[1], rgb[2], (parseFloat(opacity) / 0.45));
        });
    }

    toggleSidebarButtons(setting) {
        let sidebarIcons = this.windowDocument.querySelectorAll('.link-dark.rounded');
        sidebarIcons.forEach((sI) => {
            if (sI.classList.contains('active')) {
                sI.classList.remove('active');
            }

            sI.classList.forEach((cl) => {
                if (setting.toLowerCase().includes(cl.toLowerCase())) {
                    sI.classList.add('active');
                }
            })
        });
    }

    changeWindowColor(red, green, blue, opacity) {
        let newOpacity = 0.45 * opacity;
        let rgbaColor = `rgba(${red}, ${green}, ${blue}, ${newOpacity})`;
        setSetting(keySettings.windowColor, rgbaColor);
        if (this.windowDocument.querySelector('#opacityRange')) {
            this.windowDocument.querySelector('#opacityRange').value = (opacity) * 100;
            this.windowDocument.querySelector('#opacityPercentage').innerHTML = `${opacity * 100}%`;
        }
        window.parent.reloadColors();
        window.parent.loadTrashIcon();
    }

    changeFontColor(red, green, blue) {
        setSetting(keySettings.fontColor, `rgba(${red}, ${green}, ${blue})`);
        window.parent.reloadColors();
    }

    changeOpacity(event) {
        let rgbaColor = getSetting(keySettings.windowColor).replace('rgba(', '').replace(')', '').split(',');
        rgbaColor[3] = event.target.value / 100;
        this.changeWindowColor(rgbaColor[0], rgbaColor[1], rgbaColor[2], rgbaColor[3]);
        this.windowDocument.getElementById('opacityPercentage').innerHTML = `${event.target.value}%`;
    }

    changeWallpaper(path) {
        setSetting(keySettings.wallpaper, `/resources/themes/wallpapers/${path}`);
        loadDesktop();
        if (getSetting(keySettings.autoWindowColor)) {
            this.loadAutoWindowColor();
        }
    }

}