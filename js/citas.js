let citas = [];

function add(cita) {
  citas.push(cita);
}

function save() {
  localStorage.setItem("citas", JSON.stringify(citas));
}

function read() {
  citas = JSON.parse(localStorage.getItem("citas"));
}
