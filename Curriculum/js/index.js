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

//Draggable
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
  iF.style.height = parseInt(h.replace('px', '')) - 91 + 'px';
});


