let citas = [];

function add(cita) {
  citas.push(cita);
}

function save() {
  localStorage.setItem("citas", JSON.stringify(citas));
}

function read() {
  let strRead = localStorage.getItem("citas");
  if (strRead) citas = JSON.parse();
}
