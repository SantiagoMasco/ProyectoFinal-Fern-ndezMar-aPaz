document.addEventListener("DOMContentLoaded", function() {
    const formularioRegistro = document.getElementById("formulario-registro");
  
    formularioRegistro.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const contrasena = document.getElementById("contrasena").value;
  
      document.getElementById("registro").innerHTML = "";
  
      const mensajeCompra = document.createElement("div");
      mensajeCompra.classList.add("mensaje-exito");
      mensajeCompra.textContent = "¡Compra realizada con éxito! Gracias por elegirnos :)";
    
  
      const volverBtn = document.createElement("button");
     
      volverBtn.textContent = "Inicio";
      volverBtn.addEventListener("click", function() {
        window.location.href = "http://127.0.0.1:5500/panchi/Paginaprincipal/index.html";
      });
  
      document.getElementById("registro").appendChild(mensajeCompra);
      document.getElementById("registro").appendChild(volverBtn);
    });

    const volverInicio = document.getElementById("volver-inicio");
    volverInicio.addEventListener("click", function() {
      window.location.href = "http://127.0.0.1:5500/panchi/Paginaprincipal/index.html";
    });
});