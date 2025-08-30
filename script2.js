cargarVistaEventos()

function cargarVistaEventos(){
      const main = document.getElementById("mainContent")
      main.innerHTML = `
    <h3 class="mx-3">Todos los eventos</h3>
    <div class="cards">
      <div class="container">
        <div class="row g-4 justify-content-evenly" id="cardContainer"></div>
      </div>
    </div>
  `
  renderCards()
    }


// cambiar nombre dependiendo del usuario

const currentUser = JSON.parse(localStorage.getItem("currentUser"))
if(currentUser){
  document.getElementById("userName").textContent = currentUser.name
}
else{
  window.location.href = "index.html"
}

//log out

const user = JSON.parse(localStorage.getItem("currentUser")) || false
if(!user){
  window.location.href="index.html"
}

const logOut = document.getElementById("logOut")
logOut.addEventListener("click", () =>{
  alert("Hasta pronto!")
  //vaciar storage
  localStorage.removeItem("currentUser")
  window.location.href="index.html"
})



//vista para crear un nuevo evento

const btnCambiar = document.getElementById("btnCambiar");
const mainContent = document.getElementById("mainContent");
const nuevoTemplate = document.getElementById("template-crearEvento")

btnCambiar.addEventListener("click", () =>{

  fetch("crear.html")
  .then(res => res.text())
  .then(html => {
   document.getElementById("mainContent").innerHTML = html
   initEventosPublicitarios()
  })

document.getElementById("dashboard").addEventListener("click", ()=>{
  location.reload()
})

})

function initEventosPublicitarios(){
  const placeholderImg = document.getElementById("placeholderImg")
  const btnMat = document.getElementById("btnMat")
  const inputFileP = document.getElementById("inputFile2")
  const btnGuardar = document.getElementById("btnGuardar")

  


  const btnCancelar = document.getElementById("btnCancelar")

  if(btnMat && inputFileP && placeholderImg){
    btnMat.addEventListener("click", () => inputFileP.click())

    inputFileP.addEventListener("change", (event) =>{
      const file = event.target.files[0]
      if(file){
        const reader = new FileReader()
        reader.onload = e =>{
          placeholderImg.src = e.target.result
        }
        reader.readAsDataURL(file)
      }
    })
  }
       if(btnCancelar){
        btnCancelar.onclick = () =>{
        cargarVistaEventos()

      }

       }

  if(btnGuardar){
    btnGuardar.addEventListener("click", () =>{
      const index = btnGuardar.dataset.index;

      console.log("boton presionado")
      const imgFile = inputFileP.files[0];
     let imgSrc = placeholderImg.src || "placeholderImg.png"
      const nombre = document.getElementById("inputNombre").value || "Sin nombre"
      console.log("inputNombre", nombre)
      const lugar = document.getElementById("inputLugar").value || "Sin lugar"
      console.log("inputLugar", lugar)
      const fecha = document.getElementById("inputFecha").value || "Sin fecha"
      console.log("inputFecha", fecha)
      const categoria = document.getElementById("inputCategoria").value || "Sin categoria"
      console.log("inputCategoria", categoria)
      const aforo = document.getElementById("inputAforo").value || "N/A"
      console.log("inputAforo", aforo)
      const responsables = document.getElementById("inputResp").value || "N/A"
      console.log("inputResp", responsables)
      const descripcion = document.getElementById("inputDescripcion").value || "Sin descripcion"
      console.log("inputDescripcion", descripcion)
      const patrocinadores = document.getElementById("inputPatrocinadores").value || "N/A"
      console.log("inputPatrocinadores", patrocinadores)
      const artistas = document.getElementById("inputArtistas").value || "N/A"
      console.log("inputArtistas", artistas)
      const precio = document.getElementById("inputPrecio").value || "0"
      console.log("inputPrecio", precio)

        const evento = {
             nombre,lugar,fecha,categoria,aforo,responsables,descripcion,patrocinadores,artistas,
             precio,imgSrc
        }

        let eventos = JSON.parse(localStorage.getItem("eventos")) || []

        if(index !== undefined){
          //modo edicion
          eventos[index] = evento
          mostrarMensajeExito("acutalizado correctamente")
        } else {
          eventos.push(evento)
          mostrarMensajeExito("creado correctamente")
        }

        
        localStorage.setItem("eventos", JSON.stringify(eventos))       
         cargarVistaEventos()


    })
  }
}

function renderCards(){
  const cardsContainer = document.getElementById("cardContainer")
  if(!cardsContainer) return

  const eventos = JSON.parse(localStorage.getItem("eventos")) || []

  cardsContainer.innerHTML = ""

  function formatearFecha(fechaISO){
    if(!fechaISO) return ""
    const [year,month,day] = fechaISO.split("-")
    return `${day}/${month}/${year}`
  }

  eventos.forEach((evento, index) =>{
    const col = document.createElement("div")
    col.className = "col-md-4"
    col.innerHTML = 
    `
      <div class="card card-hover border-0 evento-card" id="custom-card" data-index="${index}">
        <img src="${evento.imgSrc}" class="card-img-top" alt="${evento.nombre}">
        <div class="card-body">
          <h5 class="card-subtitle">${evento.categoria}</h5>
          <h3 class="card-title">${evento.nombre}</h3>
          <p class="card-text"><b>Lugar:</b> ${evento.lugar}</p>
          <p class="card-text"><b>Fecha:</b> ${formatearFecha(evento.fecha)}</p>

        </div>
      </div>
    `
    cardsContainer.appendChild(col)
  })

  document.querySelectorAll(".evento-card").forEach(card =>{
    card.addEventListener("click", () =>{
      const index = card.getAttribute("data-index")
      abrirModalEvento(index)
    });
  })
}

function abrirModalEvento(index){
  const eventos = JSON.parse(localStorage.getItem("eventos")) || []
  const evento = eventos[index]

  if(!evento) return

  const modalBody = document.getElementById("modalBodyEvento")
  modalBody.innerHTML = `
  <div class="row justify-content-center">
     <div class="col-md-5">
     <h3 class="text-center" >Afiche publicitario</h3>
     <img src = "${evento.imgSrc}" class = "img-fluid mb-3" alt="${evento.nombre}">
     </div>
     <div class="col-md-7">
     <p><b>Nombre:</b> ${evento.nombre}</p>
  <p><b>Lugar:</b> ${evento.lugar}</p>
  <p><b>Fecha:</b> ${evento.fecha}</p>
  <p><b>Categoria:</b> ${evento.categoria}</p>
  <p><b>Aforo:</b> ${evento.aforo}</p>
  <p><b>Responsables:</b> ${evento.responsables}</p>
     </div>
  </div>
  <div class="col mt-3">
  <p><b>Descripcion:</b> ${evento.descripcion}</p>
  <p><b>Patrocinadores:</b> ${evento.patrocinadores}</p>
  <p><b>Artistas:</b> ${evento.artistas}</p>
  <p><b>Precio:</b> ${evento.precio}</p>
  </div>
  `

  document.getElementById("btnEliminarE").onclick = () =>{
    if(confirm("¿seguro que deseas eliminar este evento?")){
      eventos.splice(index, 1)
      localStorage.setItem("eventos", JSON.stringify(eventos))
      cargarVistaEventos()
      bootstrap.Modal.getInstance(document.getElementById("eventoModal")).hide()
      mostrarMensajeExito("evento eliminado correctamente")
      
    }
  }

  document.getElementById("btnEditarE").onclick = () =>{
    bootstrap.Modal.getInstance(document.getElementById("eventoModal")).hide()
    abrirFormEdicion(index)
  }

  const modal = new bootstrap.Modal(document.getElementById("eventoModal"))
  modal.show()
}

function abrirFormEdicion(index) {
  const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  const evento = eventos[index];

  if (!evento) return;

  fetch("crear.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("mainContent").innerHTML = html;
      initEventosPublicitarios();

      setTimeout(() =>{
        const btnGuardar = document.getElementById("btnGuardar")
        if(btnGuardar){
          btnGuardar.dataset.index = index
        }
      })


      // Rellenar inputs con los valores del evento
      document.getElementById("inputNombre").value = evento.nombre;
      document.getElementById("inputLugar").value = evento.lugar;
      document.getElementById("inputFecha").value = evento.fecha;
      document.getElementById("inputCategoria").value = evento.categoria;
      document.getElementById("inputAforo").value = evento.aforo;
      document.getElementById("inputResp").value = evento.responsables;
      document.getElementById("inputDescripcion").value = evento.descripcion;
      document.getElementById("inputPatrocinadores").value = evento.patrocinadores;
      document.getElementById("inputArtistas").value = evento.artistas;
      document.getElementById("inputPrecio").value = evento.precio;
      document.getElementById("placeholderImg").src = evento.imgSrc;


    });
}

function convertirIMgBase64(file, callback){
  const reader = new FileReader()
  reader.onload = function(e){
    callback(e.target.result)
  }
  reader.readAsDataURL(file)
}

function actualizarEvento(e) {
  const index = e.target.dataset.index; // recuperar index
  let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

  eventos[index] = {
    nombre: document.getElementById("inputNombre").value,
    lugar: document.getElementById("inputLugar").value,
    fecha: document.getElementById("inputFecha").value,
    categoria: document.getElementById("inputCategoria").value,
    aforo: document.getElementById("inputAforo").value,
    responsables: document.getElementById("inputResp").value,
    descripcion: document.getElementById("inputDescripcion").value,
    patrocinadores: document.getElementById("inputPatrocinadores").value,
    artistas: document.getElementById("inputArtistas").value,
    precio: document.getElementById("inputPrecio").value,
    imgSrc: document.getElementById("placeholderImg").src
  };

  const fileInput = document.getElementById("fileInput");

  if (fileInput.files.length > 0) {
  const file = fileInput.files[0];

  const maxSize = 200 * 1024; // 200 KB en bytes
  if (file.size > maxSize) {
    alert("La imagen es demasiado grande. Por favor selecciona una imagen menor a 200 KB.");
    return;
  }

  convertirIMgBase64(file, (imgBase64) => {
    eventos[index].imgSrc = imgBase64;
    guardarCambios(eventos);
  });

} else {
  eventos[index].imgSrc = eventos[index].imgSrc || "default.jpg";
  guardarCambios(eventos);
}

}

function guardarCambios(eventos) {
  localStorage.setItem("eventos", JSON.stringify(eventos));
  mostrarMensajeExito("Evento actualizado correctamente");
  cargarVistaEventos();
}



function mostrarMensajeExito(texto){
  const msg = document.createElement("div")
  msg.textContent = texto
  msg.className = "alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3"
  document.body.appendChild(msg)

  setTimeout(() =>{
    msg.remove()
  }, 2500)
}

  document.addEventListener("DOMContentLoaded", renderCards)

const dropdownToggles = document.querySelectorAll(".has-dropdown > a")
const dropdownMenus = document.querySelectorAll(".has-dropdown .dropdown")

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault()

    // Abrimos solo el que corresponde
    const parent = toggle.parentElement
    const menu = parent.querySelector(".dropdown")

    if(menu.classList.contains("show")){
      menu.classList.remove("show")
    } else{
       dropdownMenus.forEach(menu => menu.classList.remove("show"))
       menu.classList.add("show")
    }
  })
})

// Cerrar al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!e.target.closest(".has-dropdown")) {
    dropdownMenus.forEach(menu => menu.classList.remove("show"))
  }
})


    


// cambiar el estado de las opciones de la sidebar-menu


const sidebarLinks = document.querySelectorAll(".sidebar-menu ul li a");

sidebarLinks.forEach(link => {
  link.addEventListener("click", function(e){
    e.preventDefault();

    sidebarLinks.forEach(l => l.classList.remove("active"));

    this.classList.add("active");
  });
});




