window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add('scroll-active');
    else navbar.classList.remove('scroll-active');
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const index = params.get("index");

  if (index === null) {
    console.error("No se recibió index");
    return;
  }

  const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  const evento = eventos[index];

  if (!evento) {
    console.error("Evento no encontrado");
    return;
  }

  // Reemplazar banner
  const banner = document.querySelector(".banner-content");
  if (banner) {
    banner.querySelector("h1").textContent = evento.nombre;
    banner.querySelector("img").src = evento.imgSrc;
  }

  // Reemplazar flyer
  const flyer = document.querySelector(".flyer img");
  if (flyer) flyer.src = evento.imgSrc;

  // Detalles
  const detalles = document.querySelector(".detalles");
  if (detalles) {
    detalles.innerHTML = `
      <h4 class="fw-bold">Detalles</h4>
      <p><strong>Lugar: </strong>${evento.lugar}</p>
      <p><strong>Fecha: </strong>${evento.fecha}</p>
      <p><strong>Categoría: </strong>${evento.categoria}</p>
      <p><strong>Aforo máximo: </strong>${evento.aforo}</p>
      <p><strong>Responsables: </strong>${evento.responsables}</p>
      <p><strong>Artistas invitados: </strong>${evento.artistas}</p>
      <p><strong>Precio Entrada: </strong>${evento.precio}</p>
    `;
  }

  // Patrocinadores
  const patrocinadores = document.querySelector(".patrocinadores ul");
  if (patrocinadores) {
    patrocinadores.innerHTML = evento.patrocinadores
      .split(",")
      .map(p => `<li>${p.trim()}</li>`)
      .join("");
  }

  // Descripción
  const descripcion = document.querySelector(".descripcion p");
  if (descripcion) descripcion.textContent = evento.descripcion;
});