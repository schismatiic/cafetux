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
  content.innerHTML = "";
  //   ===============================================================================================
  //   DOM elements
  const inicio_container = document.createElement("div");
  const inicio_img = document.createElement("img");
  const inicio_p = document.createElement("p");
  //   ===============================================================================================
  //   Classname and styles
  inicio_container.className = "inicio_container";
  //   ===============================================================================================
  //   Text content / src
  inicio_img.src =
    "https://larazacoffee.cl/cdn/shop/articles/v60.webp?v=1685481020";
  inicio_p.textContent =
    "Inspirados en la pasión de Momo por el café y las cafeteras, en Cafetux reunimos modelos modernos y funcionales para quienes disfrutan preparar un buen café en casa. Desde la Saeco A-50 hasta la Bialetti que es el típico café napolitano.";
  inicio_container.appendChild(inicio_img);
  inicio_container.appendChild(inicio_p);
  content.appendChild(inicio_container);
};
const renderCatalogo = () => {
  content.innerHTML = "";
  //   ===============================================================================================
  //   DOM elements
  const inicio_container = document.createElement("div");
  const inicio_img = document.createElement("img");
  const inicio_p = document.createElement("p");
  //   ===============================================================================================
  //   Classname and styles
  inicio_container.className = "inicio_container";
  //   ===============================================================================================
  //   Text content / src
  inicio_img.src =
    "https://larazacoffee.cl/cdn/shop/articles/v60.webp?v=1685481020";
  inicio_p.textContent =
    "Inspirados en la pasión de dsadsadasdasda por el café y las cafeteras, en Cafetux reunimos modelos modernos y funcionales para quienes disfrutan preparar un buen café en casa. Desde la Saeco A-50 hasta la Bialetti que es el típico café napolitano.";
  inicio_container.appendChild(inicio_img);
  inicio_container.appendChild(inicio_p);
  content.appendChild(inicio_container);
};
//   ===============================================================================================
//   Listeners
botones_nav.forEach((boton) => {
  boton.addEventListener("click", () => {
    titulo__pagina.textContent = boton.textContent;
    if (boton.textContent === "Inicio") {
      renderInicio();
    } else if (boton.textContent === "Catálogo") {
      renderCatalogo();
    }
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
