//   ===============================================================================================
//   DOM elements
const content = document.getElementById("content");
const tux = document.getElementById("tux");
const boton_inicio = document.getElementById("inicio");
const boton_catalogo = document.getElementById("catalogo");
const boton_nosotros = document.getElementById("nosotros");
const titulo__pagina = document.getElementById("titulo__pagina");
const botones_nav = document.querySelectorAll(".boton__nav");
//   ===============================================================================================
//   Variables
let toggleTux = true;
//   ===============================================================================================
//   Render
const renderInicio = () => {
  //   ===============================================================================================
  //   DOM elements
  const inicio_container = document.createElement("div");
};
//   ===============================================================================================
//   Listeners
botones_nav.forEach((boton) => {
  boton.addEventListener("click", () => {
    titulo__pagina.textContent = boton.textContent;
  });
});
tux.addEventListener("click", () => {
  if (toggleTux) {
    toggleTux = false;
    tux.src = "https://media.tenor.com/S61VCO73mOAAAAAj/linux-tux.gif";
  } else {
    toggleTux = true;
    tux.src = "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png";
  }
});
renderInicio();
