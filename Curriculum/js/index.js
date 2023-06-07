//General functions
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

//Dock
let icons = document.querySelectorAll(".ico");
let length = icons.length;

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
dragElement(document.getElementById('ventana1'));

function dragElement(elmnt) {
  if (elmnt === undefined || elmnt == null)
    return;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

new ResizeSensor(document.getElementById('ventana1'), function () {
  let v = document.getElementById('ventana1');
  let h = v.style.height;
  let iF = v.getElementsByTagName('iframe')[0];
  iF.style.height = parseInt(h.replace('px', '')) - 85 + 'px';
});

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
  forecastIcon.setAttribute('src', './resources/weather/' + datos.weather[0].icon + '.png');
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

getLocation();

//Fecha y hora
function getDateTime () {
  var time = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var h = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours();
  var m = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes();
  hour.innerHTML = `${h}:${m}`;
  date.innerHTML = time.toLocaleDateString('es-ES', options)
  setTimeout(getDateTime, 1000);
}

getDateTime();

//Aplicaciones
function openWindow (url) {
  document.getElementById('ventana1').classList.remove('d-none');
}

function closeWindow (event) {
  event.target.parentElement.parentElement.parentElement.classList.add('d-none');
}

//Menú contextual
const contextMenu = document.querySelector(".wrapper"),
shareMenu = contextMenu.querySelector(".share-menu");

window.addEventListener("contextmenu", e => {
    e.preventDefault();
    let x = e.offsetX, y = e.offsetY,
    winWidth = window.innerWidth,
    winHeight = window.innerHeight,
    cmWidth = contextMenu.offsetWidth,
    cmHeight = contextMenu.offsetHeight;

    if(x > (winWidth - cmWidth - shareMenu.offsetWidth)) {
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
});

document.addEventListener("click", () => contextMenu.style.visibility = "hidden");



