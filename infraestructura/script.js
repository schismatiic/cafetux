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
    src: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1200&auto=format&fit=crop",
  },

  {
    nombre: "Saeco A-50",
    descripcion:
      "La favorita del jefe Momo. Automática, poderosa y perfecta para quienes quieren café premium sin perder tiempo. Aprietas un botón y mamma mia… qué belleza.",
    src: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?q=80&w=1200&auto=format&fit=crop",
  },

  {
    nombre: "Nespresso Vertuo",
    descripcion:
      "Pequeña pero peligrosa, como un italiano manejando en Roma. Ideal para cápsulas rápidas con sabor elegante y espuma cremosa.",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
  },

  {
    nombre: "Prensa Francesa Barista",
    descripcion:
      "Para los artistas del café, capisce? Una extracción suave, intensa y perfecta para disfrutar una mañana tranquila mirando la lluvia con jazz italiano.",
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
  },

  {
    nombre: "Promo Famiglia x4",
    descripcion:
      "Cuatro cafeteras para toda la famiglia. Porque en Italia el café no se toma solo, se comparte con la nonna, el primo y todo el barrio.",
    src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1200&auto=format&fit=crop",
  },

  {
    nombre: "Pack Italiano 4 Cafeteras + 2 Propiedades",
    descripcion:
      "Una promo criminalmente buena, ragazzo. Cuatro cafeteras seleccionadas por el propio Momo para convertir cualquier cocina en una cafetería italiana de lujo.",
    src: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=1200&auto=format&fit=crop",
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
    //   ===============================================================================================
    //   Classname and styles
    catalogo_container.className = "catalogo_container";
    right.className = "catalogo_right";
    //   ===============================================================================================
    //   Text content / src
    catalogo_h3.textContent = cafetera.nombre;
    catalogo_p.textContent = cafetera.descripcion;
    catalogo_img.src = cafetera.src;
    left.appendChild(catalogo_img);
    right.appendChild(catalogo_h3);
    right.appendChild(catalogo_p);
    catalogo_container.appendChild(left);
    catalogo_container.appendChild(right);
    content.appendChild(catalogo_container);
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
