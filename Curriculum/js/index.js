//Variables y constantes
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
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

//Ventanas abiertas
let cachedWindow = {
  id: 0,
  taskbarIcon: ''
}

let cachedWindows = [];

window.addEventListener('DOMContentLoaded', function () {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  loadDock();

  loadDesktop();

  loadContextMenu();

  getLocation();

  getDateTime();

});

function maxZIndex(zIndex) {
  let zI = Math.max.apply(null,
    $.map($('body *'), function (e, n) {
      if ($(e).css('position') != 'static')
        return parseInt($(e).css('z-index')) || 1;
    }));

  //debugger;
  if (zIndex < zI) {
    return zI + 1;
  } else {
    return zIndex;
  }
}

//Escritorio
function loadDock() {
  //Dock
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
  //Determie if background image is dark or light
  getImageLightness(document.getElementById('bdy').style.backgroundImage.split('"')[1], function (brightness) {
    let iconsNodeList = document.querySelectorAll('.gallery button');
    [...iconsNodeList].forEach((icon) => {
      icon.classList.remove('lightText');
      icon.classList.remove('darkText');
      icon.classList.add(brightness < 127 ? 'lightText' : 'darkText');
    });
  });
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
function openWindow(url, taskbarIcon) {
  //Put into open windows list
  let cloneID = Date.now();
  let cW = { ...cachedWindow }
  cW.taskbarIcon = taskbarIcon;
  cW.id = cloneID;
  cachedWindows.push(cW);
  console.log(cachedWindows);

  document.getElementById(taskbarIcon).classList.add('li-on');
  let clone = document.getElementsByClassName('window')[0].cloneNode(true);
  clone.id = cloneID;
  let fullURL = `${url}?id=${cloneID}`;
  clone.getElementsByTagName('iframe')[0].setAttribute('src', fullURL);
  clone.classList.remove('d-none');
  clone.style.zIndex = maxZIndex(0);
  document.getElementsByTagName('body')[0].appendChild(clone);
  if (localStorage.getItem('windowHistory') == null) {
    localStorage.setItem('windowHistory', JSON.stringify([]))
  }
}

function closeWindow(event) {
  let w = event.target.parentElement.parentElement.parentElement;
  let tI = cachedWindows.filter(function (obj) {
    return obj.id + '' == w.id + ''
  })[0].taskbarIcon;

  cachedWindows = cachedWindows.filter(function (obj) {
    return obj.id + '' !== w.id + '';
  });

  let r = cachedWindows.filter(function (obj) {
    return obj.taskbarIcon == tI;
  });

  if (r.length == 0) {
    document.getElementById(tI).classList.remove('li-on');
  }

  let wH = JSON.parse(localStorage.getItem('windowHistory'));
  if (wH == null) {
    wH == [];
  }
  wH = wH.filter((element) => { return element.windowID != w.id; });
  localStorage.setItem('windowHistory', JSON.stringify(wH));
  w.remove();
}

function restoreMaximizeWindow(event) {
  let el = event.target.parentElement.parentElement;
  if (el.id == "") {
    el = event.target.parentElement.parentElement.parentElement;
  }
  if (el.id == 'bdy') {
    el = event.target.parentElement;
  }
  if (el.classList.contains('max')) {
    el.classList.remove('max');
  } else {
    el.classList.add('max');
  }
  el.style.zIndex = maxZIndex(el.style.zIndex);
}

function back(event) {
  // let wH = JSON.parse(localStorage.getItem('windowHistory'));
  // let wID = event.target.parentElement.parentElement.parentElement.parentElement.id;
  // if(wH != null) {
  //   let ww = wH.filter((obj) => {return obj.windowID == wID});
  //   if(ww.length > 0) {
  //     ww[0].urlPosition = ww[0].urlPosition - 1;
  //     let urlWindow = ww[0].urls[ww[0].urlPosition];
  //     document.getElementById(ww[0].windowID).getElementsByTagName('iframe')[0].src = urlWindow;
  //   }

  // }

  //localStorage.setItem('windowHistory', JSON.stringify(wH));
}

function forward(event) {

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
  //debugger
  if (e.target.id != "") {
    if (e.clientX > e.target.getBoundingClientRect().right - borderMargin) {
      e.target.style.cursor = "ew-resize"; // Cambiar el cursor al redimensionar
      //console.log('👉🏻');
    } else if (e.clientY > e.target.getBoundingClientRect().bottom - borderMargin) {
      e.target.style.cursor = "ns-resize"; // Cambiar el cursor al redimensionar
      //console.log('👇🏻');
    } else {
      e.target.style.cursor = "grabbing"; // Restaurar el cursor predeterminado
      //console.log('👋🏻');
    }
  }
}
