const name_input = document.getElementById("nombre");
const tel_input = document.getElementById("telefono");
const date_input = document.getElementById("fecha");
const desc_input = document.getElementById("desc");
const send_btn = document.getElementById("send-btn");
const form = document.getElementById("form");

send_btn.addEventListener("click", (event) => {
  read();
  let new_data = {
    nombre: name_input.value,
    tel: tel_input.value,
    fecha: new Date(date_input.value),
    desc: desc_input.value,
    acabado: false,
  };
  add(new_data);
  save();
  window.location.href = "index.html";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
