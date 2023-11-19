
window.addEventListener('DOMContentLoaded', function () {
  createWindowsCache();
  
  refresh();

});

//Variables y constantes

let theme = getSetting(keySettings.theme);

var systemApps = {
  icon: `/resources/themes/${theme}/system/folder.png`,
  name: `apps`,
  content: [
    {
      icon: `/resources/themes/${theme}/system/settings.png`,
      name: `Ajustes`,
      internalName: 'settings.app'
    },
    {
      icon: `/resources/themes/${theme}/system/calculator.png`,
      name: `Calculadora`,
      internalName: 'calculator.app'
    },
    {
      icon: `/resources/themes/${theme}/system/calendar.png`,
      name: `Calendario`,
      internalName: 'calendar.app'
    },
    {
      icon: `/resources/themes/${theme}/system/camera.png`,
      name: `Cámara`,
      internalName: 'camera.app'
    },
    {
      icon: `/resources/themes/${theme}/system/contacts.png`,
      name: `Contactos`,
      internalName: 'contacts.app'
    },
    {
      icon: `/resources/themes/${theme}/system/mail.png`,
      name: `Correo electrónico`,
      internalName: 'mail.app'
    },
    {
      icon: `/resources/themes/${theme}/system/document.png`,
      name: `Editor de documentos`,
      internalName: 'textEdit.app'
    },
    {
      icon: `/resources/themes/${theme}/system/folder.png`,
      name: `Explorador de archivos`,
      internalName: 'fileExplorer.app'
    },
    {
      icon: `/resources/themes/${theme}/system/photos.png`,
      name: `Fotos`,
      internalName: 'photos.app'
    },
    {
      icon: `/resources/themes/${theme}/system/info.png`,
      name: `Información`,
      internalName: 'info.app'
    },
    {
      icon: `/resources/themes/${theme}/system/task-manager.png`,
      name: `Monitor del sistema`,
      internalName: 'taskManager.app'
    },
    {
      icon: `/resources/themes/${theme}/system/internet.png`,
      name: `Navegador`,
      internalName: 'internet.app'
    },
    {
      icon: `/resources/themes/${theme}/system/music.png`,
      name: `Reproductor de música.app`,
      internalName: 'music'
    },
    {
      icon: `/resources/themes/${theme}/system/video.png`,
      name: `Reproductor de vídeo.app`,
      internalName: 'video'
    },
    {
      icon: `/resources/themes/${theme}/system/clock.png`,
      name: `Reloj`,
      internalName: 'clock.app'
    },
    {
      icon: `/resources/themes/${theme}/system/terminal.png`,
      name: `Terminal`,
      internalName: 'terminal.app'
    },
    {
      icon: `/resources/themes/${theme}/system/weather.png`,
      name: `Tiempo`,
      internalName: 'weather.app'
    },
    {
      icon: `/resources/themes/${theme}/system/shop.png`,
      name: `Tienda`,
      internalName: 'shop.app'
    },
    {
      icon: `/resources/themes/${theme}/misc/vscode.png`,
      name: `Visual Studio Code`,
      internalName: 'vscode.app'
    }
  ]
};

let fileSystem = [
  {
    icon: `/resources/themes/${theme}/system/computer.png`,
    name: 'Este equipo',
    content: [
      {
        icon: `/resources/themes/${theme}/system/disk.png`,
        name: 'Disco del sistema',
        content: [
          {
            icon: `/resources/themes/${theme}/system/folder.png`,
            name: `user`,
            content: [
              {
                icon: `/resources/themes/${theme}/system/code.png`,
                name: `Lenguajes`,
                content: [
                  {
                    icon: `/resources/themes/${theme}/misc/csharp.png`,
                    name: `C#`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/sql.png`,
                    name: `SQL`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/html.png`,
                    name: `HTML5`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/css.png`,
                    name: `CSS`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/js.png`,
                    name: `JavaScript`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/ts.png`,
                    name: 'TypeScript',
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/php.png`,
                    name: `PHP`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/java.png`,
                    name: `Java`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/vb.png`,
                    name: `Visual Basic`,
                    content: []
                  }
                ]
              },
              {
                icon: `/resources/themes/${theme}/system/framework.png`,
                name: `Frameworks`,
                content: [
                  {
                    icon: `/resources/themes/${theme}/misc/net.png`,
                    name: `.NET (Classic & Core)`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/laravel.png`,
                    name: `Laravel`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/angular.png`,
                    name: `Angular`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/bootstrap.png`,
                    name: `Bootstrap`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/jQuery.png`,
                    name: `JQuery`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/electron.png`,
                    name: `Electron`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/vue.png`,
                    name: `Vue`,
                    content: []
                  }
                ]
              },
              {
                icon: `/resources/themes/${theme}/system/ide.png`,
                name: `Entornos de desarrollo`,
                content: [
                  {
                    icon: `/resources/themes/${theme}/misc/vs.png`,
                    name: `Visual Studio`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/vscode.png`,
                    name: `Visual Studio Code`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/netbeans.png`,
                    name: `Netbeans`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/android.png`,
                    name: `Android Studio`,
                    content: []
                  },
                  {
                    icon: `/resources/themes/${theme}/misc/eclipse.png`,
                    name: `Eclipse`,
                    content: []
                  }
                ]
              }
            ]
          },
          {
            icon: `/resources/themes/${theme}/system/folder.png`,
            name: `resources`,
            content: [
              {
                icon: `/resources/userpic.png`,
                name: `userpic.png`
              },
              {
                icon: `/resources/themes/${theme}/system/folder.png`,
                name: `themes`,
                content: [
                  {
                    icon: `/resources/themes/${theme}/system/themes.png`,
                    name: `default.theme`
                  },
                  {
                    icon: `/resources/themes/${theme}/system/themes.png`,
                    name: `windows.theme`
                  },
                  {
                    icon: `/resources/themes/${theme}/system/themes.png`,
                    name: `macOS.theme`
                  },
                ]
              },
              {
                icon: `/resources/themes/${theme}/system/folder.png`,
                name: `wallpapers`,
                content: [
                  {
                    icon: `/resources/themes/wallpapers/Blue.jpg`,
                    name: `Blue.jpg`
                  },
                  {
                    icon: `/resources/themes/wallpapers/Flower.jpg`,
                    name: `Flower.jpg`
                  },
                  {
                    icon: `/resources/themes/wallpapers/Grass.jpg`,
                    name: `Grass.jpg`
                  },
                  {
                    icon: `/resources/themes/wallpapers/Gray.jpg`,
                    name: `Gray.jpg`
                  },
                  {
                    icon: `/resources/themes/wallpapers/Lavender.jpg`,
                    name: `Lavender.jpg`
                  },
                  {
                    icon: `/resources/themes/wallpapers/Mountains.jpg`,
                    name: `Mountains.jpg`
                  },
                  {
                    icon: `/resources/themes/wallpapers/Red.jpg`,
                    name: `Red.jpg`
                  },
                  {
                    icon: `/resources/themes/wallpapers/Sand.jpg`,
                    name: `Sand.jpg`
                  },
                  {
                    icon: `/resources/themes/wallpapers/Sky.jpg`,
                    name: `Sky.jpg`
                  },
                  {
                    icon: `/resources/themes/wallpapers/Strawberries.jpg`,
                    name: `Strawberries.jpg`
                  },
                  {
                    icon: `/resources/themes/wallpapers/Waves.jpg`,
                    name: `Waves.jpg`
                  },
                ]
              }
            ]
          },
          systemApps
        ]
      }
    ]
  }
];


String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

//Dock
const focus = (elem, index) => {
  let previous = index - 1;
  let previous1 = index - 2;
  let next = index + 1;
  let next2 = index + 2;

  try {
    elem.style.transform = "scale(1.2)  translateX(0px)";
  } catch (error) {

  }

  try {
    icons[previous].style.transform = "scale(1) translateX(-6px)";
  } catch (error) {

  }

  try {
    icons[previous1].style.transform = "scale(1)";
  } catch (error) {

  }

  try {
    icons[next].style.transform = "scale(1) translateX(6px)";
  } catch (error) {

  }

  try {
    icons[next2].style.transform = "scale(1)";
  } catch (error) {

  }

};

//Ventanas
let offsetX, offsetY, isResizingRight, isResizingBottom = false;
const minWidth = 539;
const minHeight = 210;
const borderMargin = 20;
var maxWidth = window.innerWidth;
var maxHeight = window.innerHeight;


//General
function refresh() {
  clearAllTimeouts();

  setSetting('fileSystem', fileSystem);

  loadDock();

  loadDesktop();

  loadContextMenu();

  getLocation();

  getDateTime();

  checkUpdates();
}

function clearAllTimeouts() {
  var id = window.setTimeout(function () { }, 0);
  while (id--) {
    window.clearTimeout(id);
  };
}

function maxZIndex(zIndex) {
  let zI = Math.max.apply(null,
    $.map($('body *'), function (e, n) {
      if ($(e).css('position') != 'static')
        return parseInt($(e).css('z-index')) || 1;
    }));


  if (zIndex < zI) {
    return zI + 1;
  } else {
    return zIndex;
  }
}

async function checkUpdates() {
  let v = getSetting(keySettings.version);
  let response = await fetch('https://raw.githubusercontent.com/dsb97/Cacharreo/master/Curriculum/js/version.json');
  let data = await response.json();
  console.log(data);
}

function showNotifications() {
  var toast = new bootstrap.Toast(document.getElementById('liveToast'));
  toast.show();
}

//Escritorio
function loadDock() {
  let icons = document.querySelectorAll(".ico");

  icons.forEach((item, index) => {
    item.addEventListener("mouseover", (e) => {
      focus(e.target, index);
    });
    item.addEventListener("mouseleave", (e) => {
      icons.forEach((item) => {
        item.style.transform = "scale(1)  translateY(0px)";
      });
    });
  });
}

function loadDesktop() {
  window.document.body.style.zoom = getSetting(keySettings.zoomLevel);
  window.document.body.style.backgroundImage = `url("${getSetting(keySettings.wallpaper)}")`;
  //Determie if background image is dark or light
  getImageLightness(window.document.body.style.backgroundImage.split('"')[1], function (brightness) {
    let iconsNodeList = document.querySelectorAll('.gallery button');
    [...iconsNodeList].forEach((icon) => {
      icon.classList.remove('lightText');
      icon.classList.remove('darkText');
      icon.classList.add(brightness < 127 ? 'lightText' : 'darkText');
    });
  });

  setColorStyles();
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

function loadContextMenu() {
  const contextMenu = document.querySelector(".wrapper"),
    shareMenu = contextMenu.querySelector(".share-menu");

  window.addEventListener("contextmenu", e => {
    e.preventDefault();
    let x = e.offsetX, y = e.offsetY,
      winWidth = window.innerWidth,
      winHeight = window.innerHeight,
      cmWidth = contextMenu.offsetWidth,
      cmHeight = contextMenu.offsetHeight;

    if (x > (winWidth - cmWidth - shareMenu.offsetWidth)) {
      shareMenu.style.left = "-200px";
    } else {
      shareMenu.style.left = "";
      shareMenu.style.right = "-200px";
    }

    x = x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y;

    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.visibility = "visible";
    contextMenu.style.zIndex = maxZIndex(contextMenu.style.zIndex);
  });

  document.addEventListener("click", () => contextMenu.style.visibility = "hidden");
}

//Barra superior
//Tiempo
function forecastRequest(position) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=24df251cc48b660b67328e7b827099d5`;
  var myHeaders = new Headers();
  var myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };
  return new Request(
    url,
    myInit
  );
}

function processForecastResponse(datos) {
  forecastIcon.setAttribute('src', './resources/themes/default/weather/' + datos.weather[0].icon + '.png');
  forecastDescription.innerHTML = `${Math.ceil(datos.main.temp)} °C &nbsp;&nbsp;${datos.weather[0].description.toString().capitalize()}`;
}

function getForecast(position) {
  fetch(forecastRequest(position))
    .then(function (response) {
      return response.json();
    })
    .then(processForecastResponse);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getForecast);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

//Fecha y hora
function getDateTime() {
  var time = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var h = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours();
  var m = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes();
  hour.innerHTML = `${h}:${m}`;
  date.innerHTML = time.toLocaleDateString('es-ES', options)
  setTimeout(getDateTime, 1000);
}

//Ventanas
function openWindow(url, dockIcon, path) {
  //Get opened windows.
  //If there is an minimized instance, it will be restored
  //If there is no minimized instance, it will create a new one
  ;
  let cWs = getCachedWindows();
  if (cWs.some((element) => element.dockIcon == dockIcon && element.windowStatus == windowStatus.minimized)) {
    cWs.forEach((element) => {
      if (element.dockIcon == dockIcon && element.windowStatus == windowStatus.minimized) {
        ;
        minimizeWindow(element.windowID);
      }
    });
  } else {
    //Put into open windows list
    let cloneID = Date.now();
    let fullURL = `${url}?id=${cloneID}&path=${path}`;

    let cW = { ...cachedWindow }
    cW.windowID = cloneID;
    cW.dockIcon = dockIcon;
    cW.windowStatus = windowStatus.restored;
    addCachedWindow(cW);

    //Add indicator at dock
    document.getElementById(dockIcon).classList.add('li-on');

    //Create new window instance
    let clone = document.getElementsByClassName('window')[0].cloneNode(true);
    clone.id = cloneID;
    clone.getElementsByTagName('iframe')[0].setAttribute('src', fullURL);
    clone.style.zIndex = maxZIndex(0);
    clone.style.transform = "scale(0)";
    document.getElementsByTagName('body')[0].appendChild(clone);
  }
}

function closeWindow(event) {
  //Get the window object
  let w = event.target.parentElement.parentElement.parentElement;
  let cW = getCachedWindow(w.id);
  //Remove from cache
  removeCachedWindow(w.id);

  //Query cache to remove or not dock indicator
  let cWs = getCachedWindows();
  let openWindows = cWs.filter(function (obj) {
    return obj.dockIcon == cW.dockIcon;
  });
  if (openWindows.length == 0) {
    document.getElementById(cW.dockIcon).classList.remove('li-on');
  }

  w.style.animationName = 'closeApp';
  w.style.animationDuration = '0.2s';
  w.style.animationTimingFunction = 'ease-in-out';

  w.addEventListener('animationend', () => {
    w.style.animationName = '';
    w.remove();
  });
}

function restoreMaximizeWindow(event) {
  let el = event.target.parentElement.parentElement;
  if (el.id == "") {
    el = event.target.parentElement.parentElement.parentElement;
  }
  if (el.id == 'desktopFrame') {
    el = event.target.parentElement;
  }

  let rgba = document.defaultView.getComputedStyle(el, null)['backgroundColor'].replace('rgba(', '').replace(')', '').replaceAll(' ', '').split(',');

  let timeOut = setTimeout(() => {
    el.style.transition = null;
    clearTimeout(timeOut);
  }, 300);
  el.style.transition = 'all 0.2s ease-in-out 0s';
  ;
  if (el.classList.contains('max')) {
    el.classList.remove('max');
    el.style.backgroundColor = null;
    el.style.backgroundColor = getSetting(keySettings.windowColor);
  } else {
    el.classList.add('max');
    el.style.backgroundColor = null;
    el.style.backgroundColor = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${parseFloat(rgba[3])+0.4})`;

  }
  el.style.zIndex = maxZIndex(el.style.zIndex);
}

function minimizeWindow(event) {
  let el;
  if (event.target) {
    el = event.target.parentElement.parentElement;
    if (el.id == '') {
      el = event.target.parentElement.parentElement.parentElement;
    }
    if (el.id == 'desktopFrame') {
      el = event.target.parentElement;
    }
    updateCachedWindowStatus(el.id, windowStatus.minimized);
  } else {
    el = document.getElementById(event);
    updateCachedWindowStatus(el.id, windowStatus.restored);
  }


  let isHidden = getCachedWindow(el.id).windowStatus != windowStatus.minimized;

  el.style.animationName = isHidden ? 'fadeInAndMove' : 'fadeAndMove';
  el.style.animationDuration = '0.2s';
  el.style.animationTimingFunction = 'ease-in-out';
  el.style.animationFillMode = 'forwards';

  isHidden = !isHidden;

}

function resizeStart(e, div) {
  if (e.target.id != "") {
    offsetX = e.clientX - div.getBoundingClientRect().left;
    offsetY = e.clientY - div.getBoundingClientRect().top;

    isResizingRight = (e.clientX > div.getBoundingClientRect().right - borderMargin);
    isResizingBottom = (e.clientY > div.getBoundingClientRect().bottom - borderMargin);

    document.onmousemove = (e) => {
      if (isResizingRight) {
        resize(e, div, 'right');
        //console.log('👉🏻');
      } else if (isResizingBottom) {
        resize(e, div, 'bottom');
        //console.log('👇🏻');
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }

}

function dragStart(e, div) {
  if (e.target.id == "") {
    offsetX = e.clientX - div.getBoundingClientRect().left;
    offsetY = e.clientY - div.getBoundingClientRect().top;

    document.onmousemove = (e) => {
      div.style.zIndex = maxZIndex(div.style.zIndex);
      drag(e, div);
    }

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
}

function drag(e, div) {
  const newX = e.clientX - offsetX;
  const newY = e.clientY - offsetY;

  // Limit the position within the window bounds
  div.style.left = Math.min(maxWidth - div.offsetWidth, Math.max(0, newX)) + "px";
  div.style.top = Math.min(maxHeight - div.offsetHeight, Math.max(0, newY)) + "px";
}

function resize(e, div, direction) {
  if (direction == 'right') {
    const newWidth = e.clientX - div.getBoundingClientRect().left;
    div.style.width = Math.min(maxWidth - div.offsetLeft, Math.max(minWidth, newWidth)) + "px";
  } else if (direction == 'bottom') {
    const newHeight = e.clientY - div.getBoundingClientRect().top;
    div.style.height = Math.min(maxHeight - div.offsetTop, Math.max(minHeight, newHeight)) + "px";
  }
}

function changeCursor(e) {

  if (e.target.id != "") {
    if (e.clientX > e.target.getBoundingClientRect().right - borderMargin) {
      e.target.style.cursor = "ew-resize"; // Cambiar el cursor al redimensionar
      //console.log('👉🏻');
    } else if (e.clientY > e.target.getBoundingClientRect().bottom - borderMargin) {
      e.target.style.cursor = "ns-resize"; // Cambiar el cursor al redimensionar
      //console.log('👇🏻');
    } else {
      e.target.style.cursor = "default"; // Restaurar el cursor predeterminado
      //console.log('👋🏻');
    }
  }
}