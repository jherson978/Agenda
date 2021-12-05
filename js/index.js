const wheel = document.getElementById("wheel");
const plus = document.getElementById("plus");
const clock = document.getElementById("clock");
const university = document.getElementById("university");
const check = document.getElementById("check");
const wheelMsg = document.getElementById("wheel-msg");

// Util
let ang = 0;
let wheelRect = wheel.getBoundingClientRect();
class Vector {
  x = 0;
  y = 0;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  rotated(angle) {
    return new Vector(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle)
    );
  }
  plus(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  minus(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
}

function setPos(element, vec) {
  element.style.left = `${vec.x}px`;
  element.style.top = `${vec.y}px`;
}

function degRad(deg) {
  return (deg * Math.PI) / 180;
}

function radDeg(rad) {
  return rad * 57.2958;
}

function setup() {
  let center = new Vector(wheel.offsetWidth / 2, wheel.offsetHeight / 2);
  let plusCenter = new Vector(plus.offsetWidth / 2, plus.offsetHeight / 2);
  let elCenter = new Vector(clock.offsetWidth / 2, clock.offsetHeight / 2);

  let v = new Vector(0, -wheel.offsetWidth / 2 + clock.offsetWidth);
  let vClock = v.rotated(degRad(ang));
  let vUniversity = vClock.rotated(degRad(120));
  let vCheck = vUniversity.rotated(degRad(120));

  setPos(plus, center.minus(plusCenter));
  setPos(clock, center.plus(vClock.minus(elCenter)));
  setPos(university, center.plus(vUniversity.minus(elCenter)));
  setPos(check, center.plus(vCheck.minus(elCenter)));
}

window.addEventListener("load", () => {
  wheelRect = wheel.getBoundingClientRect();
  setup();
});
window.addEventListener("resize", () => {
  wheelRect = wheel.getBoundingClientRect();
  setup();
});

// Wheel drag
const delta = 6;
let startX;
let startY;
let dragging = false;
let startAng = ang;

wheel.addEventListener("pointerdown", (event) => {
  startX = event.pageX;
  startY = event.pageY;
  dragging = true;
  startAng = ang;
  console.log(startAng);
});

wheel.addEventListener("pointermove", (event) => {
  if (dragging) {
    const wheelX = wheelRect.x + wheelRect.width / 2;
    const wheelY = wheelRect.y + wheelRect.height / 2;
    ang =
      Math.atan2(event.pageY - wheelY, event.pageX - wheelX) -
      Math.atan2(startY - wheelY, startX - wheelX);
    ang = startAng + radDeg(ang);
    setup();
  }
});

window.addEventListener("pointerup", (event) => {
  const diffX = Math.abs(event.pageX - startX);
  const diffY = Math.abs(event.pageY - startY);
  dragging = false;

  ang = ang % 360;
  console.log(ang);
  if (ang > 300 || ang < 60) {
    ang = 0;
    wheelMsg.innerHTML = "Proximos";
  } else if (ang < 180) {
    wheelMsg.innerHTML = "Acabados";
    ang = 120;
  } else {
    wheelMsg.innerHTML = "Todos";
    ang = 240;
  }
  setup();
});

// Service worker
if ("serviceWorker" in navigator) {
  console.log("Service Worker");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw.js")
      .then((reg) => console.log(reg.scope))
      .catch((err) => console.log(err));
  });
}
