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
const cafeteras = [
  {
    nombre: "Bialetti Moka Express",
    descripcion:
      "La clásica de los verdaderos capos del café, ragazzo. Una cafetera italiana que prepara un espresso intenso, elegante y con aroma que despierta hasta al más dormido.",
    precio: "$89.990",
    src: "https://www.bialetti.co.nz/cdn/shop/products/5322s.jpg?v=1503972578",
  },

  {
    nombre: "Saeco A-50",
    descripcion:
      "La favorita del jefe Momo. Automática, poderosa y perfecta para quienes quieren café premium sin perder tiempo. Aprietas un botón y mamma mia… qué belleza.",
    precio: "$249.990",
    src: "https://flatnwhite.com/wp-content/uploads/2023/04/SE-50_trequarti.jpg",
  },

  {
    nombre: "Nespresso Vertuo",
    descripcion:
      "Pequeña pero peligrosa, como un italiano manejando en Roma. Ideal para cápsulas rápidas con sabor elegante y espuma cremosa.",
    precio: "$119.990",
    src: "https://m.media-amazon.com/images/I/31T6my99pML._AC_US1000_.jpg",
  },

  {
    nombre: "Prensa Francesa Bialetti",
    descripcion:
      "Para los artistas del café, capisce? Una extracción suave, intensa y perfecta para disfrutar una mañana tranquila mirando la lluvia con jazz italiano.",
    precio: "$39.990",
    src: "https://paramicafe.cl/wp-content/uploads/2022/11/Prensa-Francesa-1-L-Bialetti-Preziosa.webp",
  },

  {
    nombre: "Promo 4 Cafeteras",
    descripcion:
      "Cuatro cafeteras para toda la famiglia. Porque en Italia el café no se toma solo, se comparte con la nonna, el primo y todo el barrio.",
    precio: "$499.990",
    src: "https://resources.claroshop.com/medios-plazavip/mkt/5e693e81c517b_prensafrancesa_cafetera_4piezas_drinklabppf350ngjpg.jpg",
  },

  {
    nombre: "Pack Italiano 4 Cafeteras + 2 Propiedades",
    descripcion:
      "Una promo criminalmente buena. Incluye cuatro cafeteras seleccionadas por Momo y 2 propiedades en Sicilia, perfectas para vivir tomando café frente al mar como un auténtico italiano.",
    precio: "$89.999.990",
    src: "https://i.ytimg.com/vi/JuAuT12vSgU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBG_0X1t1Ew5iSQTcemeRS1GUsTCw",
  },
];
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
  cafeteras.forEach((cafetera) => {
    //   ===============================================================================================
    //   DOM elements
    const catalogo_container = document.createElement("div");
    const left = document.createElement("div");
    const right = document.createElement("div");
    const catalogo_img = document.createElement("img");
    const catalogo_h3 = document.createElement("h3");
    const catalogo_p = document.createElement("p");
    const catalogo_precio = document.createElement("p");
    const boton_comprar = document.createElement("button");
    //   ===============================================================================================
    //   Classname and styles
    catalogo_container.className = "catalogo_container";
    right.className = "catalogo_right";
    boton_comprar.className = "boton_comprar";
    //   ===============================================================================================
    //   Text content / src
    catalogo_h3.textContent = cafetera.nombre;
    catalogo_p.textContent = cafetera.descripcion;
    catalogo_precio.textContent = `${cafetera.precio}`;
    boton_comprar.textContent = "Comprar";
    catalogo_img.src = cafetera.src;
    left.appendChild(catalogo_img);
    right.appendChild(catalogo_h3);
    right.appendChild(catalogo_p);
    right.appendChild(catalogo_precio);
    right.appendChild(boton_comprar);
    catalogo_container.appendChild(left);
    catalogo_container.appendChild(right);
    content.appendChild(catalogo_container);
    //   ===============================================================================================
    //   Listener
    boton_comprar.addEventListener("click", () => {
      catalogo_img.src =
        "https://media.tenor.com/BPSfyjEKq-0AAAAM/momo-bailando.gif";
    });
  });
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
