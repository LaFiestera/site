window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add('scroll-active');
    else navbar.classList.remove('scroll-active');
});

const eventos = [
  {
    titulo: "Desfile Reinado de la independencia",
    fecha: "28 de Noviembre, 2025",
    lugar: "Centro histórico",
    categoria: "Cultural",
    imagen: "https://64.media.tumblr.com/6168c10e6e4ef41bd11675a7b623b404/5ce99519c939fd0e-07/s1280x1920/bce8fdc28d6ee55742be7f86963536ca9cd1edf0.webp"
  },
  {
    titulo: "Evento 2",
    fecha: "15 de Octubre, 2025",
    lugar: "Torre del reloj",
    categoria: "Deportivo",
    imagen: "https://64.media.tumblr.com/1f7ce119cd528a801d225eb8385491ff/392a4754d5b0e1bb-b6/s500x750/aff7555d4287a3ed024fa92c3d8f45395133b55d.pnj"
  },
  {
    titulo: "Evento 3",
    fecha: "1 de Diciembre, 2025",
    lugar: "Plaza de toros",
    categoria: "Musical",
    imagen: "https://64.media.tumblr.com/1f7ce119cd528a801d225eb8385491ff/392a4754d5b0e1bb-b6/s500x750/aff7555d4287a3ed024fa92c3d8f45395133b55d.pnj"
  }
];

// references (asegúrate estas líneas estén una sola vez en tu archivo)
const inputTexto = document.querySelector('input[placeholder="Buscar por evento"]');
const [selectLugar, selectCategoria] = document.querySelectorAll(".filtros select");
const inputFecha = document.querySelector('input[type="date"]');
const btnBuscar = document.querySelector(".boton-buscar");

// Helper: obtiene array actual y lo convierte a pares { e, i }
function getEventosConIndices() {
  const eventosStorage = JSON.parse(localStorage.getItem("eventos")) || [];
  return eventosStorage.map((e, i) => ({ e, i }));
}

function pintarEventos(pares) {
  const contenedor = document.getElementById("contenedor-cards");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (!pares || pares.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron eventos</p>";
    return;
  }

  pares.forEach(pair => {
    const ev = pair.e;
    const originalIndex = pair.i;

    const col = document.createElement("div");
    col.classList.add("col-md-4");

    col.innerHTML = `
      <a href="evento_screen.html?index=${originalIndex}" style="text-decoration: none; color: inherit;">
        <div class="card h-100 cartota evento-home-card" data-index="${originalIndex}">
          <img src="${ev.imgSrc}" class="card-img-top" alt="evento">
          <div class="card-body">
            <h5 class="card-title fw-bold">${ev.nombre}</h5>
            <p><strong>Fecha:</strong> ${ev.fecha}</p>
            <p><strong>Lugar:</strong> ${ev.lugar}</p>
            <p><strong>Categoría:</strong> ${ev.categoria}</p>
          </div>
        </div>
      </a>
    `;
    contenedor.appendChild(col);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const pares = getEventosConIndices();
  pintarEventos(pares);
});

// Helper: obtiene el valor del <select>
function valorSelect(select) {
  if (!select) return "";
  const opt = select.options[select.selectedIndex];
  if (!opt || opt.disabled || !opt.value.trim()) return "";
  return opt.value.trim();
}

// búsqueda / filtrado usando indices reales
if (btnBuscar) {
  btnBuscar.addEventListener("click", () => {
    const pares = getEventosConIndices();

    const texto = (inputTexto?.value || "").toLowerCase().trim();
    const lugar = (valorSelect(selectLugar) || "").toLowerCase();
    const categoria = (valorSelect(selectCategoria) || "").toLowerCase();
    const fecha = inputFecha?.value || "";

    const filtrados = pares.filter(pair => {
      const ev = pair.e;
      const coincideTexto = !texto || (ev.nombre || "").toLowerCase().includes(texto);
      const coincideLugar = !lugar || (ev.lugar || "").toLowerCase().includes(lugar);
      const coincideCategoria = !categoria || (ev.categoria || "").toLowerCase().includes(categoria);
      const coincideFecha = !fecha || (ev.fecha || "") === fecha;
      return coincideTexto && coincideLugar && coincideCategoria && coincideFecha;
    });

    pintarEventos(filtrados);
  });
}
