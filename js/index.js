const wheel = document.getElementById("wheel");
const plus = document.getElementById("plus");
const clock = document.getElementById("clock");
const university = document.getElementById("university");
const check = document.getElementById("check");

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

function setup() {
  let center = new Vector(wheel.offsetWidth / 2, wheel.offsetHeight / 2);
  let plusCenter = new Vector(plus.offsetWidth / 2, plus.offsetHeight / 2);
  let elCenter = new Vector(clock.offsetWidth / 2, clock.offsetHeight / 2);

  let vClock = new Vector(0, -wheel.offsetWidth / 2 + clock.offsetWidth);
  let vUniversity = vClock.rotated(degRad(120));
  let vCheck = vUniversity.rotated(degRad(120));

  setPos(plus, center.minus(plusCenter));
  setPos(clock, center.plus(vClock.minus(elCenter)));
  setPos(university, center.plus(vUniversity.minus(elCenter)));
  setPos(check, center.plus(vCheck.minus(elCenter)));
}

window.addEventListener("load", () => {
  setup();
});
window.addEventListener("resize", () => {
  setup();
});

let ang = 0;
let FPS = 30;

/*
setInterval(function() {    
    setPos(clock, center.plus(vClock.minus(elCenter)));
    setPos(university, center.plus(vUniversity.minus(elCenter)));
    setPos(check, center.plus(vCheck.minus(elCenter)));
     

}, 1000/FPS);
*/

/*
setInterval(function() {
    v.rotate(degRad(1));
    setPos(clock, center.plus(v.minus(elCenter)));
    v.rotate(degRad(120));
    setPos(university, center.plus(v.minus(elCenter)));
    v.rotate(degRad(120));
    setPos(check, center.plus(v.minus(elCenter)));
    v.rotate(degRad(120));
}, 1000/FPS);*/

if ("serviceWorker" in navigator) {
  console.log("Service Worker");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw.js")
      .then((reg) => console.log(reg.scope))
      .catch((err) => console.log(err));
  });
}
